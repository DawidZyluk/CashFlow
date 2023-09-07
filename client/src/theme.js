import { createTheme } from "@mui/material";

const tokens = {
  primary: {
    100: "#d5e2db",
    200: "#abc5b6",
    300: "#80a892",
    400: "#568b6d",
    500: "#2c6e49",
    600: "#23583a",
    700: "#1a422c",
    800: "#122c1d",
    900: "#09160f",
  },
  gold: {
    100: "#fff1cd",
    200: "#ffe29a",
    300: "#ffd468",
    400: "#ffc535",
    500: "#ffb703",
    600: "#cc9202",
    700: "#996e02",
    800: "#664901",
    900: "#332501",
  },
  grey: {
    100: "#eff0f2",
    200: "#dee1e5",
    300: "#ced3d7",
    400: "#bdc4ca",
    500: "#adb5bd",
    600: "#8a9197",
    700: "#686d71",
    800: "#45484c",
    900: "#232426",
  },
  info: {
    50: "#c0e0eb",
    100: "#cce4f0",
    200: "#99c9e2",
    300: "#66add3",
    400: "#3392c5",
    500: "#0077b6",
    600: "#005f92",
    700: "#00476d",
    800: "#003049",
    900: "#001824",
  },
  error: {
    50: "#f7d7dd",
    100: "#f7cdd4",
    200: "#f09ba9",
    300: "#e8687f",
    400: "#e13654",
    500: "#d90429",
    600: "#ae0321",
    700: "#820219",
    800: "#570210",
    900: "#2b0108",
  },
};

export const themeOptions = createTheme({
  palette: {
    mode: "light",
    background: {
      default: tokens.grey[100]
    },
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      dark: tokens.primary[600]
    },
    gold: {
      ...tokens.gold,
      main: tokens.gold[500],
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    info: {
      ...tokens.info,
      main: tokens.info[500],
    },
    error: {
      ...tokens.error,
      main: tokens.error[500],
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    h3: {
      "@media (max-width: 375px)": {
        fontSize: "2.5rem",
      },
    },
  },
});
