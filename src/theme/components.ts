import { ComponentStyleConfig } from "@chakra-ui/theme";

export const components: { [key: string]: ComponentStyleConfig } = {
  FormLabel: {
    baseStyle: {
      fontFamily: "openSans",
      color: "gray.700",
    },
  },
  Input: {
    sizes: {
      lg: {
        field: {
          borderRadius: 4,
          fontSize: "md",
        },
      },
    },
    variants: {
      outline: {
        field: {
          _focus: {
            boxShadow: "none",
            borderColor: "gray.500",
          },
        },
      },
    },
    defaultProps: {
      size: "lg",
    },
  },
  Textarea: {
    sizes: {
      lg: {
        borderRadius: 4,
        height: 120,
        resize: "none",
        fontSize: "md",
      },
    },
    variants: {
      outline: {
        _focus: {
          boxShadow: "none",
          borderColor: "gray.500",
        },
      },
    },
    defaultProps: {
      size: "lg",
    },
  },
  Text: {
    baseStyle: {
      fontFamily: "openSans",
    },
  },
  Heading: {
    baseStyle: {
      fontFamily: "oswald",
    },
  },
  Button: {
    baseStyle: {
      py: 6,
      borderRadius: 0,
      transition: "all 0.3s ease-in",
      fontFamily: "openSans",
      fontWeight: 400,
      fontSize: "sm",

      _focus: {
        boxShadow: "none",
      },
    },
    variants: {
      primary: {
        background: "charlestonGreen",
        color: "white",
        boxShadow: " 0px 9px 0px -5px #FFD60A",

        _focus: {
          boxShadow: " 0px 9px 0px -5px #FFD60A",
        },

        _hover: {
          background: "gray.700",
        },
      },
      secondary: {
        background: "gold.900",
        color: "charlestonGreen",
        boxShadow: " 0px 9px 0px -5px rgba(0,0,0,0.75)",

        _focus: {
          boxShadow: " 0px 9px 0px -5px rgba(0,0,0,0.75)",
        },

        _hover: {
          background: "yellow.500",
        },
      },
    },
    sizes: {
      sm: {
        px: 5,
      },
    },
    defaultProps: {
      variant: "primary",
    },
  },
};
