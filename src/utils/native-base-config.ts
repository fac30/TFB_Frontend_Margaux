import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#E8E4DE',
      100: '#FFFFFF',
      200: '#8B7355',
      300: '#8B7355',
    }
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  space: {
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 20,
    '4xl': 24,
  },
  sizes: {
    xs: 20,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
    '2xl': 56,
    '3xl': 64,
    '4xl': 72,
  },
  radii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    full: 9999,
  },
  shadows: {
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  components: {
    Box: {
      defaultProps: {
        bg: 'primary.200',
        color: 'primary.100'
      }
    },
    Text: {
      defaultProps: {
        color: 'primary.100',
        fontSize: 'md'
      }
    },
    Heading: {
      defaultProps: {
        color: 'primary.100',
        fontSize: '2xl'
      }
    },
    ReactMarkdown: {
      defaultProps: {
        color: 'primary.100'
      }
    },
    VStack: {
      defaultProps: {
        bg: 'primary.200',
        space: 'md'
      }
    },
    HStack: {
      defaultProps: {
        bg: 'primary.200',
        space: 'md'
      }
    },
    Center: {
      defaultProps: {
        bg: 'primary.200'
      }
    },
    Button: {
      defaultProps: {
        bg: 'primary.200',
        borderColor: 'primary.100',
        borderWidth: 1,
        _hover: { bg: 'primary.300' },
        _text: { color: 'primary.100' }
      }
    },
    Image: {
      defaultProps: {
        size: 'md',
        resizeMode: 'contain'
      }
    },
    Input: {
      defaultProps: {
        borderColor: 'primary.100',
        color: 'primary.100',
        _focus: {
          borderColor: 'primary.100',
          bg: 'primary.200'
        },
        _hover: {
          borderColor: 'primary.100'
        }
      }
    },
    ScrollView: {
      defaultProps: {
        bg: 'primary.200',
        showsHorizontalScrollIndicator: false
      }
    }
  }
}) 