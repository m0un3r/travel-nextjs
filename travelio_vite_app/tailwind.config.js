/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        travelio: {
          gold: {
            DEFAULT: '#FA8F21',
            50: '#FFF8F0',
            100: '#FEF0DF',
            200: '#FDE0BF',
            300: '#FCCF9F',
            400: '#FBAF5F',
            500: '#FA8F21',
            600: '#E07512',
            700: '#BA590B',
            800: '#94440C',
            900: '#7A380D',
          },
          dark: {
            DEFAULT: '#1A1A17',
            950: '#0F0F0D',
            900: '#1A1A17',
            850: '#232320',
            800: '#2C2C28',
            700: '#3D3D38',
            600: '#52524C',
          },
          sand: {
            DEFAULT: '#F5F0EB',
            50: '#FCFAF8',
            100: '#F5F0EB',
            200: '#ECE3DA',
            300: '#DFD1C3',
            400: '#CCB6A1',
          },
          cream: '#FAFAF9',
          charcoal: '#404040',
        },
        category: {
          cities: {
            light: '#EBF4FC',
            badge: '#D2E6F6',
            text: '#1D4ED8',
            accent: '#3B82F6',
          },
          nature: {
            light: '#EBF7EE',
            badge: '#E8F5E9',
            text: '#15803D',
            accent: '#10B981',
          },
          adventure: {
            light: '#FEF8E7',
            badge: '#FEF3C7',
            text: '#B45309',
            accent: '#F59E0B',
          },
          honeymoon: {
            light: '#FDF0F4',
            badge: '#FEDBE5',
            text: '#BE185D',
            accent: '#EC4899',
          },
          wildlife: {
            light: '#FEFBE8',
            badge: '#FEF9C3',
            text: '#A16207',
            accent: '#EAB308',
          },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(26, 26, 23, 0.05)',
        'soft-md': '0 8px 24px -4px rgba(26, 26, 23, 0.08)',
        'soft-lg': '0 16px 36px -6px rgba(26, 26, 23, 0.12)',
        'soft-xl': '0 24px 48px -12px rgba(26, 26, 23, 0.16)',
        'gold-glow': '0 0 25px -3px rgba(250, 143, 33, 0.35)',
        'card-hover': '0 20px 40px -15px rgba(26, 26, 23, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
