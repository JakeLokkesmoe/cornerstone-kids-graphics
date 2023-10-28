import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "rgb(167, 64, 46)",
    },
    secondary: {
      main: "#e3e3e3",
    },
    error: {
      main: "#E94560",
    },
    background: {
      default: "#212121",
      paper: "#242424",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
