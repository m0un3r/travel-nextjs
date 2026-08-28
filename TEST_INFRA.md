# E2E Test Infra: Travelio React + Vite Web Application

## Test Philosophy
- Opaque-box, requirement-driven. Derives strictly from user requirements and acceptance criteria.
- Multi-tier progressive test methodology: Category-Partition, BVA, Pairwise, Real-World Workload, and Adversarial Edge Cases.
- Fast execution via Vitest + JSDOM + React Testing Library with zero SSR dependencies.

## Feature Inventory & Test Coverage
| # | Feature | Source | Tier 1 (Smoke/Mount) | Tier 2 (Boundary/Filter) | Tier 3 (Cross-Feature/Modal) | Tier 4 (Workload/Responsive) |
|---|---------|--------|:--------------------:|:------------------------:|:----------------------------:|:----------------------------:|
| 1 | Navbar & Mobile Drawer | R2 | 5 | 5 | ✓ | ✓ |
| 2 | Hero & Search Bar | R2 | 5 | 5 | ✓ | ✓ |
| 3 | Tour Categories Filter | R2 | 5 | 5 | ✓ | ✓ |
| 4 | Tour Cards & Detail Modal | R2 | 5 | 5 | ✓ | ✓ |
| 5 | Traveler Stories / Reviews | R2 | 5 | 5 | ✓ | ✓ |
| 6 | 'Plan a Trip' Modal Form | R2 | 5 | 5 | ✓ | ✓ |
| 7 | Footer & Newsletter | R2 | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test Runner: Vitest (`npm test` / `vitest run`)
- Setup: `src/test/setup.ts` (DOM matchers, matchMedia mock, ResizeObserver mock, scrollTo mock)
- Test Directory: `travelio_vite_app/src/test/`
  - `components/` (Unit tests for Navbar, Hero, Categories, TourCard, Modal, Footer)
  - `integration/` (Integration & E2E user flow tests in App.test.tsx)

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Discover Honeymoon tours in Maldives, view details modal, open Plan a Trip modal, prefill and submit | Categories, TourCard, TourDetailModal, PlanTripModal | High |
| 2 | Search for 'Japan' in Hero SearchBar, filter by Nature, view Kyoto Cherry Blossoms, verify ratings | Hero, SearchBar, CategoryFilter, TourList | Medium |
| 3 | Read Traveler stories, verify author and destination tags, inspect tour ratings | Stories, StoryCard, Ratings | Medium |
| 4 | Open mobile drawer on smartphone viewport, navigate sections, click CTA, submit inquiry | MobileMenu, Viewport, Modal, Toast | High |
| 5 | Subscribe to newsletter with valid/invalid email, verify instant toast alert | Newsletter, Toast, Validation | Medium |

## Coverage Thresholds
- Tier 1: ≥5 per feature area (Mount & initial render)
- Tier 2: ≥5 per feature area (Boundary, empty queries, invalid inputs)
- Tier 3: Pairwise combinations (Search + Category + Modal triggers)
- Tier 4: ≥5 realistic multi-step user workflows
- Total minimum test cases: ≥ 40 verified assertions
