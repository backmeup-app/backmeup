export const components = {
  Text: {
    baseStyle: {
      fontFamily: "quattrocento",
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
      fontFamily: "quattrocento",
      fontWeight: 400,
      _focus: {
        boxShadow: "none",
      },
    },
    defaultProps: {
      colorScheme: "gold",
    },
  },
};
