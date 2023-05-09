import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  fonts: {
    heading: `'Atami'`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    accent: 'var(--accent)',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'black')(props),
      },
      ':root': {
        '--accent': mode('#FF5F1F', '#38B2AC')(props),
      },
    }),
  },
  components: {
    Button: {
      variants: {
        interact: (props) => ({
          border: '1px solid transparent',
          _hover: {
            border: '1px solid',
          },
          _active: {
            border: '1px solid',
            bg: mode('gray.300', 'gray.800')(props),
            transform: 'scale(0.98)',
          },
        }),
      },
    },
    CloseButton: {
      baseStyle: (props) => ({
        border: '1px solid transparent',
        rounded: 'none',
        _hover: {
          border: '1px solid',
        },
        _active: {
          border: '1px solid',
          bg: mode('gray.300', 'gray.800')(props),
          transform: 'scale(0.98)',
        },
      }),
    },
    Modal: {
      parts: ['dialog', 'closeButton'],
      baseStyle: (props) => ({
        dialog: {
          border: '1px solid',
          rounded: 'none',
          bg: mode('white', 'black')(props),
        },
        closeButton: {
          rounded: 'none',
          variant: 'ghost',
          border: '1px solid transparent',
          _hover: {
            border: '1px solid',
          },
        },
      }),
    },
    Menu: {
      parts: ['item', 'list'],
      baseStyle: {
        item: {
          _focus: 'none',
          _active: 'none',
        },
      },
    },
    Input: {
      baseStyle: (props) => ({
        field: {
          border: '1px solid',
          borderRadius: '0px',
          rounded: 'none',
          bg: mode('white', 'black')(props),
          ':focus': {
            bg: mode('white', 'black')(props),
          },
          _placeholder: {
            color: mode('gray.400', 'gray.500')(props),
          },
        },
      }),
      sizes: {},
      variants: {},
      defaultProps: {
        variant: null,
      },
    },
    Tag: {
      baseStyle: (props) => ({
        container: {
          border: '0px',
          borderRadius: '0px',
          background: 'accent',
        },
      }),
      sizes: {},
      variants: {},
      defaultProps: {
        variant: null,
      },
    },
  },
})

export default theme
