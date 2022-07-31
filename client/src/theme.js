import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  colors: {
    accent: "var(--accent)"
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "black")(props)
      },
      ":root": {
        "--accent": mode("#FF5F1F", "#38B2AC")(props)
      }
    })
  },
  components: {
    Button: {
      variants: {
        "interact": (props) => ({
          border: "1px solid transparent",
          _hover: {
            border: "1px solid"
          },
          _active: {
            border: "1px solid",
            bg: mode("gray.300", "gray.800")(props),
            transform: 'scale(0.98)',
          }
        })
      }
    },
    CloseButton: {
      baseStyle: (props) => ({
        border: "1px solid transparent",
        rounded: "none",
        _hover: {
          border: "1px solid"
        },
        _active: {
          border: "1px solid",
          bg: mode('gray.300', "gray.800")(props),
          transform: 'scale(0.98)',
      }
      })
    },
    Modal: {
      parts: ["dialog", "closeButton"],
      baseStyle: (props) => ({
        dialog: {
          border: "1px solid",
          rounded: "none",
          bg: mode("white", "black")(props)
        },
        closeButton: {
          rounded: "none",
          variant: "ghost",
          border: "1px solid transparent",
          _hover: {
            border: "1px solid"
          }
        }
      })
    },
    Menu: {
      parts: ["item", "list"],
      baseStyle: {
        item: {
          _focus: "none",
          _active: "none"
        }
      }
    }
  }
})

export default theme;