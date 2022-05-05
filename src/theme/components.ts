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

        _hover: {
          background: "gray.700",
        },
      },
      secondary: {
        background: "gold.900",
        color: "charlestonGreen",

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
  Accordion: {
    baseStyle: {
      container: {
        borderTopWidth: 0,

        _last: {
          borderBottomWidth: 0,
        },

        pb: 4,
      },
      button: {
        _focus: {
          boxShadow: "none",
        },
      },
      panel: {
        pb: 0,
        px: 0,
      },
    },
  },
  Link: {
    baseStyle: {
      _focus: {
        boxShadow: "none",
      },
    },
  },
  Switch: {
    baseStyle: {
      track: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
  Modal: {
    baseStyle: {
      closeButton: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
