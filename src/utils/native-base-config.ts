import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#F7F5F2',
      100: '#E8E6E1',
      200: '#D3CEC4',
      300: '#B8B2A7',
      400: '#A39E93',
      500: '#8A847A',  // Main brand color
      600: '#6F6A62',
      700: '#555049',
      800: '#3B3731',
      900: '#201E1B',
    },
    accent: {
      500: '#EC5E29', // Keeping your existing accent color for CTAs
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    }
  },
  fonts: {
    heading: 'Inter, system-ui, -apple-system, sans-serif',
    body: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, monospace',
  },
  config: {
    initialColorMode: 'light'
  },
  components: {
    Button: {
      defaultProps: {
        _hover: {
          bg: 'accent.600'
        }
      }
    },
    Text: {
      defaultProps: {
        color: 'gray.800' // Ensuring good text contrast
      }
    },
    Heading: {
      defaultProps: {
        color: 'gray.900'
      }
    }
  }
}) 