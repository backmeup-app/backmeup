import { extendTheme } from "@chakra-ui/react";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { components } from "./components";
import { styles } from "./styles";
import { sizes } from "./sizes";
import { shadows } from "./shadows";
import { typography } from "./typography";

export const theme = extendTheme({
  breakpoints,
  styles,
  colors,
  components,
  sizes,
  shadows,
  ...typography,
});
