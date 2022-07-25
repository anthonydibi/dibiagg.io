import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  colors: {
    accent: {
      100: "#FF5F1F"
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "black")(props)
      }
    })
  },
  components: {
    Button: {
      variants: {
        "interact": {
          variant: "ghost",
          border: "1px solid transparent",
          _hover: {
            border: "1px solid"
          }
        }
      }
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