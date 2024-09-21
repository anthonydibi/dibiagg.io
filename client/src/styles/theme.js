import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const LIGHT_ACCENT = '#FF5F1F';
export const DARK_ACCENT = '#38B2AC';

const theme = extendTheme({
  fonts: {
    heading: `'Atami'`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    accent: 'var(--accent)',
    accent2: 'var(--accent2)',
    lightdark: 'var(--lightdark)',
    darklight: 'var(--darklight)',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('var(--light)', 'var(--dark)')(props),
      },
      ':root': {
        '--accent': mode('#FF5F1F', '#38B2AC')(props),
        '--accent2': mode('#708747', '#fb6f92')(props),
        '--dark': mode('#202020', '#202020')(props),
        '--light': mode('#f0f0f0', '#f0f0f0')(props),
        '--lightdark': mode('white', 'black')(props),
        '--darklight': mode('black', 'white')(props),
        '--off': mode('var(--light)', 'var(--dark)')(props),
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
        grow: (props) => ({
          border: '1px solid',
          borderRadius: '0px',
          _hover: {
            transform: 'scale(1.08)',
          },
          _active: {
            bg: mode('gray.300', 'gray.800')(props),
            transform: 'scale(1.12)',
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
          bg: mode('var(--light)', 'var(--dark)')(props),
          ':focus': {
            bg: mode('white', 'black')(props),
          },
          _placeholder: {
            color: mode('gray.600', 'gray.300')(props),
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
});

export default theme;
