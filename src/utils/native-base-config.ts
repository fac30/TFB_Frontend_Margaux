import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#395D51',
      200: '#E8E4D9',
    }
  },
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Arial, sans-serif',
    mono: 'Arial, sans-serif',
  },
  fontWeights: {
    normal: 600,
    medium: 700,
    bold: 900,
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
      },
      variants: {
        hiddenInput: {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          border: "0",
          clip: "rect(0,0,0,0)"
        }
      }
    },
    Text: {
      defaultProps: {
        color: 'primary.100',
        fontSize: 'md',
        textTransform: 'uppercase'
      }
    },
    Heading: {
      defaultProps: {
        color: 'primary.100',
        fontSize: '2xl',
        textTransform: 'uppercase'
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
      baseStyle: {
        borderRadius: 'md',
        _icon: {
          color: 'primary.100'
        }
      },
      defaultProps: {
        variant: 'outline',
      },
      variants: {
        outline: {
          bg: 'transparent',
          borderWidth: 1,
          borderColor: 'primary.100',
          _text: {
            color: 'primary.100',
          },
          _hover: {
            borderColor: 'black',
            bg: 'transparent',
          },
          _pressed: {
            bg: 'transparent',
          },
          _focus: {
            bg: 'transparent',
          },
        },
        solid: {
          bg: 'primary.100',
          borderWidth: 1,
          borderColor: 'primary.100',
          _text: {
            color: 'primary.200',
          },
          _hover: {
            borderColor: 'black',
            bg: 'primary.100',
          },
          _pressed: {
            bg: 'primary.100',
          },
          _focus: {
            bg: 'primary.100',
          },
        },
        ghost: {
          bg: 'transparent',
          borderWidth: 0,
          _text: {
            color: 'primary.200',
          },
          _hover: {
            bg: 'rgba(255,255,255,0.1)',
          },
          _pressed: {
            bg: 'rgba(255,255,255,0.2)',
          },
          _focus: {
            bg: 'transparent',
          },
        },
      },
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
    },
    Icon: {
      defaultProps: {
        color: 'primary.100',
        size: 'md'
      }
    },
    IconButton: {
      defaultProps: {
        _icon: {
          color: 'primary.100'
        }
      }
    }
  }
}) 