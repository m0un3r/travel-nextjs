import { describe, it, expect } from 'vitest';
import { render, screen, act, renderHook, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '@/App';
import { useTourFilter } from '@/hooks/useTourFilter';
import { TourList } from '@/components/Tours/TourList';
import { tours as mockTours, categories as mockCategories } from '@/data/travelioData';

describe('Adversarial Search & Filter Verifier', () => {
  /* =========================================================================
   * 1. Adversarial Search Term Injection & Character Resilience
   * ========================================================================= */
  describe('1. Search Term Injection & Character Resilience', () => {
    it('handles script tags and HTML injection safely without DOM exploitation or crash', async () => {
      const user = userEvent.setup();
      render(<App />);

      const searchBarSection = screen.getByTestId('hero-search-bar');
      const searchInput = within(searchBarSection).getByPlaceholderText(/where to\?/i);
      const exploreBtn = within(searchBarSection).getByRole('button', { name: /explore tours/i });

      const xssPayloads = [
        "<script>alert('XSS-1')</script>",
        '<img src="invalid-image" onerror="window.xssHacked=true" />',
        '"><svg onload=alert(1)>',
        '<iframe src="javascript:alert(1)"></iframe>',
        '<style>body{display:none}</style>',
      ];

      for (const payload of xssPayloads) {
        fireEvent.change(searchInput, { target: { value: payload } });
        await user.click(exploreBtn);

        // Verify no raw script/iframe/style elements were created in DOM
        expect(document.querySelector('iframe')).toBeNull();
        expect(document.querySelector('script[src*="alert"]')).toBeNull();
        // @ts-expect-error test flag
        expect(window.xssHacked).toBeUndefined();

        // Tour list displays empty state safely with literal text rendered
        const emptyState = screen.getByTestId('tour-list-empty-state');
        expect(emptyState).toBeInTheDocument();
        expect(screen.getByText(/no journeys found/i)).toBeInTheDocument();
      }
    });

    it('handles regex metacharacters, wildcards and malformed patterns without regex crash', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      const regexPatterns = [
        '.*',
        '[a-z]+',
        '(foo|bar){1,3}',
        '\\d{4}',
        '^$',
        '[',
        '(',
        '?',
        '+',
        '*',
        '\\',
        '\\\\',
        '(.*?)+$',
        '(?=.*[a-z])',
        '${7*7}',
        '{{constructor.constructor("alert(1)")()}}',
      ];

      for (const pattern of regexPatterns) {
        expect(() => {
          act(() => {
            result.current.setSearchTerm(pattern);
          });
        }).not.toThrow();

        // Pattern matching treats characters literally via includes()
        expect(result.current.searchTerm).toBe(pattern);
        expect(Array.isArray(result.current.filteredTours)).toBe(true);
        expect(result.current.filteredCount).toBe(result.current.filteredTours.length);
      }
    });

    it('handles international Unicode, kanji, emojis, accents, and RTL characters gracefully', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      const unicodeTestCases = [
        { term: '🌸 ⛩️ 🏔️', expectedMatches: 0 },
        { term: '京都', expectedMatches: 0 }, // Japanese kanji for Kyoto (store is English)
        { term: 'Kyoto', expectedMatches: 2 }, // Matches "Cherry Blossoms of Kyoto" & "Tokyo & Kyoto City"
        { term: 'Tokyo', expectedMatches: 1 },
        { term: 'Japan', expectedMatches: 3 }, // 3 Japan tours
        { term: 'Morocco', expectedMatches: 2 }, // 2 Morocco tours
        { term: 'Iceland', expectedMatches: 2 }, // 2 Iceland tours
        { term: 'Maldives', expectedMatches: 2 }, // 2 Maldives tours
        { term: 'Serengeti', expectedMatches: 1 },
        { term: 'Tanzania', expectedMatches: 2 }, // 2 Tanzania tours
        { term: 'Canada', expectedMatches: 2 }, // 2 Canada tours
        { term: 'Brazil', expectedMatches: 2 }, // 2 Brazil tours
        { term: 'China', expectedMatches: 2 }, // 2 China tours
        { term: 'USA', expectedMatches: 2 }, // 2 USA tours
        { term: '日本語', expectedMatches: 0 },
        { term: 'العربية', expectedMatches: 0 },
      ];

      for (const { term, expectedMatches } of unicodeTestCases) {
        act(() => {
          result.current.setSearchTerm(term);
        });

        if (expectedMatches > 0) {
          expect(result.current.filteredTours.length).toBeGreaterThanOrEqual(expectedMatches);
        } else {
          expect(result.current.filteredTours.length).toBe(0);
        }
      }
    });

    it('handles extreme input lengths (2,000+ characters) without memory leak or performance degradation', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));
      const massiveString = 'A'.repeat(2048);

      const startTime = performance.now();
      act(() => {
        result.current.setSearchTerm(massiveString);
      });
      const duration = performance.now() - startTime;

      expect(duration).toBeLessThan(100); // Must process under 100ms
      expect(result.current.filteredTours).toHaveLength(0);
      expect(result.current.filteredCount).toBe(0);

      // Clean recovery on reset
      act(() => {
        result.current.resetFilters();
      });
      expect(result.current.filteredTours).toHaveLength(mockTours.length);
    });

    it('handles SQL and query injection payloads as safe literal strings', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));
      const sqlPayloads = [
        "' OR '1'='1",
        "'; DROP TABLE tours; --",
        "1' UNION SELECT NULL, NULL, NULL --",
        "admin'--",
        "SLEEP(5)/*",
      ];

      for (const sql of sqlPayloads) {
        act(() => {
          result.current.setSearchTerm(sql);
        });
        expect(result.current.filteredTours).toHaveLength(0);
        expect(result.current.filteredCount).toBe(0);
      }
    });
  });

  /* =========================================================================
   * 2. Extreme Filter Boundaries & Impossible Combinations
   * ========================================================================= */
  describe('2. Extreme Filter Boundaries & Impossible Combinations', () => {
    it('handles impossible category + search combinations and displays the empty state with recovery button', async () => {
      const user = userEvent.setup();
      render(<App />);

      const searchBarSection = screen.getByTestId('hero-search-bar');
      const searchInput = within(searchBarSection).getByPlaceholderText(/where to\?/i);
      const exploreBtn = within(searchBarSection).getByRole('button', { name: /explore tours/i });

      // Search for Paris under Wildlife category (impossible combination)
      const categorySelect = within(searchBarSection).getByLabelText(/category/i);
      await user.selectOptions(categorySelect, 'Wildlife');
      fireEvent.change(searchInput, { target: { value: 'Paris Louvre Eiffel' } });
      await user.click(exploreBtn);

      // Verify empty state is displayed
      const emptyState = screen.getByTestId('tour-list-empty-state');
      expect(emptyState).toBeInTheDocument();
      expect(screen.getByText(/no journeys found/i)).toBeInTheDocument();

      // Click "Reset Filters & View All" inside empty state
      const resetBtn = screen.getByRole('button', { name: /reset filters & view all/i });
      await user.click(resetBtn);

      // Verify full catalog is restored (19 tours)
      expect(screen.queryByTestId('tour-list-empty-state')).toBeNull();
      const tourGrid = screen.getByTestId('tour-grid');
      expect(tourGrid.children.length).toBe(mockTours.length);
    });

    it('trims leading, trailing, and excessive whitespace properly in search queries', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      // Pure whitespace should be treated as empty search (returns all tours)
      const whitespaceInputs = ['   ', '\t\t', '\n\n', '   \r\n   '];
      for (const ws of whitespaceInputs) {
        act(() => {
          result.current.setSearchTerm(ws);
        });
        expect(result.current.filteredTours).toHaveLength(mockTours.length);
      }

      // Whitespace padded query should match the trimmed keyword
      act(() => {
        result.current.setSearchTerm('   Kyoto   ');
      });
      expect(result.current.filteredTours.length).toBe(2);
      result.current.filteredTours.forEach((tour) => {
        const matches =
          tour.title.toLowerCase().includes('kyoto') ||
          tour.location.toLowerCase().includes('kyoto');
        expect(matches).toBe(true);
      });
    });

    it('handles mixed casing and uppercase variations across categories and durations', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      // Case-insensitive category match
      act(() => {
        result.current.setSelectedCategory('wIlDlIfE');
      });
      expect(result.current.filteredTours.length).toBe(2);
      result.current.filteredTours.forEach((tour) => {
        expect(tour.category.toLowerCase()).toBe('wildlife');
      });

      // Case-insensitive duration match (short = <= 5 days -> 6 tours in catalog)
      act(() => {
        result.current.setSelectedCategory('All');
        result.current.setSelectedDuration('SHORT');
      });
      expect(result.current.filteredTours.length).toBe(6);
      result.current.filteredTours.forEach((tour) => {
        expect(tour.days).toBeLessThanOrEqual(5);
      });

      // Medium duration match (medium = 6-9 days -> 13 tours in catalog)
      act(() => {
        result.current.setSelectedDuration('MEDIUM');
      });
      expect(result.current.filteredTours.length).toBe(13);
      result.current.filteredTours.forEach((tour) => {
        expect(tour.days).toBeGreaterThanOrEqual(6);
        expect(tour.days).toBeLessThanOrEqual(9);
      });
    });

    it('handles impossible duration combinations yielding 0 results without errors', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      // Extended duration (15+ days) has 0 tours in current catalog
      act(() => {
        result.current.setSelectedDuration('15+');
      });
      expect(result.current.filteredTours).toHaveLength(0);

      // Long duration (10-14 days) has 0 tours in current catalog
      act(() => {
        result.current.setSelectedDuration('10-14');
      });
      expect(result.current.filteredTours).toHaveLength(0);

      // Reset restores all 19
      act(() => {
        result.current.resetFilters();
      });
      expect(result.current.filteredTours).toHaveLength(19);
    });

    it('correctly filters down to exactly 1 unique tour across multiple fields', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      act(() => {
        result.current.setSearchTerm('Serengeti Great Migration');
      });

      expect(result.current.filteredTours).toHaveLength(1);
      expect(result.current.filteredTours[0].title).toBe('Serengeti Great Migration Tour');
      expect(result.current.filteredTours[0].category).toBe('Wildlife');
      expect(result.current.filteredTours[0].country).toBe('Tanzania');
    });
  });

  /* =========================================================================
   * 3. Rapid Sequential State Transitions & Reset Recovery
   * ========================================================================= */
  describe('3. Rapid Sequential State Transitions & Reset Recovery', () => {
    it('maintains strict state consistency during rapid sequential category cycling', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      const categorySequence = [
        'All',
        'Cities',
        'Nature',
        'Adventure',
        'Honeymoon',
        'Wildlife',
        'Cities',
        'Adventure',
        'All',
      ];

      for (const cat of categorySequence) {
        act(() => {
          result.current.setSelectedCategory(cat);
        });

        if (cat === 'All') {
          expect(result.current.filteredTours).toHaveLength(mockTours.length);
        } else {
          const expectedCount = mockTours.filter((t) => t.category.toLowerCase() === cat.toLowerCase()).length;
          expect(result.current.filteredTours).toHaveLength(expectedCount);
          result.current.filteredTours.forEach((t) => {
            expect(t.category.toLowerCase()).toBe(cat.toLowerCase());
          });
        }
      }
    });

    it('synchronizes rapid category tab clicks in UI with tour grid and description banners', async () => {
      const user = userEvent.setup();
      render(<App />);

      const categoryGridSection = screen.getByTestId('category-grid');
      const categoriesTablist = within(categoryGridSection).getByRole('tablist', {
        name: /filter tours by category/i,
      });

      for (const category of mockCategories) {
        const categoryTab = within(categoriesTablist).getByRole('tab', {
          name: new RegExp(category.name, 'i'),
        });
        await user.click(categoryTab);

        // Verify active category description banner is shown inside category grid
        expect(
          within(categoryGridSection).getByRole('heading', { level: 3, name: category.title })
        ).toBeInTheDocument();
        expect(within(categoryGridSection).getByText(category.description)).toBeInTheDocument();

        // Verify catalog title is updated
        expect(screen.getByText(`${category.name} Experiences`)).toBeInTheDocument();

        // Verify tour count matches
        const tourGrid = screen.getByTestId('tour-grid');
        expect(tourGrid.children).toHaveLength(category.count);
      }

      // Return to All Tours
      const allToursTab = within(categoriesTablist).getByRole('tab', { name: /all tours/i });
      await user.click(allToursTab);

      expect(screen.getByText('All Handcrafted Journeys')).toBeInTheDocument();
      const finalTourGrid = screen.getByTestId('tour-grid');
      expect(finalTourGrid.children).toHaveLength(mockTours.length);
    });

    it('handles interleaved search, category changes, and header reset buttons accurately', async () => {
      const user = userEvent.setup();
      render(<App />);

      const categoryGridSection = screen.getByTestId('category-grid');
      const categoriesTablist = within(categoryGridSection).getByRole('tablist', {
        name: /filter tours by category/i,
      });

      // 1. Switch to Honeymoon category (2 tours)
      const honeymoonTab = within(categoriesTablist).getByRole('tab', { name: /honeymoon/i });
      await user.click(honeymoonTab);
      const honeymoonGrid = screen.getByTestId('tour-grid');
      expect(honeymoonGrid.children).toHaveLength(2);

      // 2. Perform search via Hero search bar for "Maldives"
      const searchBarSection = screen.getByTestId('hero-search-bar');
      const searchInput = within(searchBarSection).getByPlaceholderText(/where to\?/i);
      const exploreBtn = within(searchBarSection).getByRole('button', { name: /explore tours/i });
      fireEvent.change(searchInput, { target: { value: 'Maldives' } });
      await user.click(exploreBtn);

      const maldivesGrid = screen.getByTestId('tour-grid');
      expect(maldivesGrid.children).toHaveLength(2); // Both Maldives tours
      expect(within(maldivesGrid).getByText(/Maldives Island Getaway/i)).toBeInTheDocument();
      expect(within(maldivesGrid).getByText(/Maldives Luxury Retreat Escape/i)).toBeInTheDocument();

      // 3. Click Reset Filters in catalog header
      const headerResetBtn = screen.getByRole('button', { name: /^reset filters$/i });
      await user.click(headerResetBtn);

      // 4. Verify catalog is completely restored to All 19 tours
      const restoredGrid = screen.getByTestId('tour-grid');
      expect(restoredGrid.children).toHaveLength(mockTours.length);
      expect(screen.getByText('All Handcrafted Journeys')).toBeInTheDocument();
    });

    it('handles rapid hero search overrides seamlessly', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      act(() => {
        result.current.handleHeroSearch({
          searchTerm: 'Japan',
          category: 'Cities',
          duration: 'medium',
        });
      });

      expect(result.current.searchTerm).toBe('Japan');
      expect(result.current.selectedCategory).toBe('Cities');
      expect(result.current.selectedDuration).toBe('medium');
      expect(result.current.filteredTours.length).toBe(1); // Tokyo & Kyoto City Experience

      // Immediately override with another search
      act(() => {
        result.current.handleHeroSearch({
          searchTerm: 'Serengeti',
          category: 'Wildlife',
          duration: 'medium',
        });
      });

      expect(result.current.searchTerm).toBe('Serengeti');
      expect(result.current.selectedCategory).toBe('Wildlife');
      expect(result.current.selectedDuration).toBe('medium');
      expect(result.current.filteredTours.length).toBe(1);
    });
  });

  /* =========================================================================
   * 4. Sorting, Price Boundaries ($0, $10,000+), and Empty Dataset Recovery
   * ========================================================================= */
  describe('4. Sorting Stress, Price Boundaries, and Dataset Edge Cases', () => {
    it('preserves mathematical sorting invariants across all SortOptions', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      // 1. Price Ascending
      act(() => {
        result.current.setSortBy('price-asc');
      });
      for (let i = 0; i < result.current.filteredTours.length - 1; i++) {
        expect(result.current.filteredTours[i].price).toBeLessThanOrEqual(
          result.current.filteredTours[i + 1].price
        );
      }

      // 2. Price Descending
      act(() => {
        result.current.setSortBy('price-desc');
      });
      for (let i = 0; i < result.current.filteredTours.length - 1; i++) {
        expect(result.current.filteredTours[i].price).toBeGreaterThanOrEqual(
          result.current.filteredTours[i + 1].price
        );
      }

      // 3. Rating Descending
      act(() => {
        result.current.setSortBy('rating');
      });
      for (let i = 0; i < result.current.filteredTours.length - 1; i++) {
        expect(result.current.filteredTours[i].rating).toBeGreaterThanOrEqual(
          result.current.filteredTours[i + 1].rating
        );
      }

      // 4. Duration Ascending
      act(() => {
        result.current.setSortBy('duration');
      });
      for (let i = 0; i < result.current.filteredTours.length - 1; i++) {
        expect(result.current.filteredTours[i].days).toBeLessThanOrEqual(
          result.current.filteredTours[i + 1].days
        );
      }

      // 5. Featured Priority
      act(() => {
        result.current.setSortBy('featured');
      });
      let sawNonFeatured = false;
      for (const tour of result.current.filteredTours) {
        if (!tour.featured) {
          sawNonFeatured = true;
        } else {
          expect(sawNonFeatured).toBe(false); // No featured tour should follow a non-featured tour
        }
      }
    });

    it('handles extreme price boundaries ($0, $10,000+, inverted ranges, negative values)', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: mockTours }));

      // Zero-dollar range (no $0 tours in luxury catalog)
      act(() => {
        result.current.setPriceRange([0, 0]);
      });
      expect(result.current.filteredTours).toHaveLength(0);

      // Low-price range ($0 to $1,500) -> 0 tours since cheapest is $1,980
      act(() => {
        result.current.setPriceRange([0, 1500]);
      });
      expect(result.current.filteredTours).toHaveLength(0);

      // Price range ($0 to $2,000) -> 1 tour ($1,980)
      act(() => {
        result.current.setPriceRange([0, 2000]);
      });
      expect(result.current.filteredTours).toHaveLength(1);
      expect(result.current.filteredTours[0].price).toBe(1980);

      // Price range ($0 to $2,900) -> 4 tours ($1980, $2680, $2750, $2890)
      act(() => {
        result.current.setPriceRange([0, 2900]);
      });
      expect(result.current.filteredTours).toHaveLength(4);
      result.current.filteredTours.forEach((t) => {
        expect(t.price).toBeLessThanOrEqual(2900);
      });

      // Price range ($5,000 to $6,000) -> 1 luxury tour ($5,480)
      act(() => {
        result.current.setPriceRange([5000, 6000]);
      });
      expect(result.current.filteredTours).toHaveLength(1);
      expect(result.current.filteredTours[0].price).toBe(5480);

      // Ultra-luxury price range ($10,000 to $50,000) -> 0 tours
      act(() => {
        result.current.setPriceRange([10000, 50000]);
      });
      expect(result.current.filteredTours).toHaveLength(0);

      // Inverted price range [5000, 1000] (min > max) -> should yield 0 matches gracefully without error
      act(() => {
        result.current.setPriceRange([5000, 1000]);
      });
      expect(result.current.filteredTours).toHaveLength(0);

      // Negative price range [-1000, -10] -> 0 matches gracefully
      act(() => {
        result.current.setPriceRange([-1000, -10]);
      });
      expect(result.current.filteredTours).toHaveLength(0);

      // Maximum safe integer boundary -> matches all tours
      act(() => {
        result.current.setPriceRange([0, Number.MAX_SAFE_INTEGER]);
      });
      expect(result.current.filteredTours).toHaveLength(mockTours.length);
    });

    it('recovers gracefully from empty dataset initialization without throwing exceptions', () => {
      const { result } = renderHook(() => useTourFilter({ initialTours: [] }));

      expect(result.current.filteredTours).toEqual([]);
      expect(result.current.totalCount).toBe(0);
      expect(result.current.filteredCount).toBe(0);

      expect(() => {
        act(() => {
          result.current.setSearchTerm('test');
          result.current.setSelectedCategory('Cities');
          result.current.setSelectedDuration('short');
          result.current.setSortBy('price-asc');
          result.current.setPriceRange([100, 500]);
          result.current.resetFilters();
        });
      }).not.toThrow();

      expect(result.current.filteredTours).toEqual([]);
    });

    it('renders empty dataset in TourList component cleanly with zero counts and empty state', () => {
      render(
        <TourList
          tours={[]}
          totalCount={0}
          selectedCategory="All"
          searchQuery="Nonexistent"
          onResetFilters={() => {}}
        />
      );

      expect(screen.getByTestId('tour-list-empty-state')).toBeInTheDocument();
      expect(screen.getByText(/showing 0 of 0 curated journeys/i)).toBeInTheDocument();
      // Verify both reset buttons exist and are accessible
      const resetButtons = screen.getAllByRole('button', { name: /reset filters/i });
      expect(resetButtons.length).toBeGreaterThanOrEqual(1);
    });
  });
});
