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
  components: {
    Box: {
      defaultProps: {
        bg: 'primary.200',
        color: 'primary.100'
      }
    },
    Text: {
      defaultProps: {
        color: 'primary.100'
      }
    },
    Heading: {
      defaultProps: {
        color: 'primary.100'
      }
    },
    ReactMarkdown: {
      defaultProps: {
        color: 'primary.100'
      }
    },
    VStack: {
      defaultProps: {
        bg: 'primary.200'
      }
    },
    Center: {
      defaultProps: {
        bg: 'primary.200'
      }
    }
  }
}) 