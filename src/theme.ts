import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const w1 = "#ffffff";
const w2 = "#FFF8E8";
const w3 = "#FCD581";
const r1 = "#D52941";
const r2 = "#990D35";

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
});

export default theme;
