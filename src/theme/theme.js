import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#F2F0F1",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#000000",
      secondary: "#666666",
    },

    divider: "#E5E5E5",
  },

  typography: {
    fontFamily: "Arial, sans-serif",

    h1: {
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: "-2px",
    },

    h2: {
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: "-1px",
    },

    h3: {
      fontWeight: 800,
    },

    body1: {
      fontSize: "14px",
      lineHeight: 1.6,
    },

    body2: {
      fontSize: "12px",
      lineHeight: 1.5,
    },

    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12,
  },

  spacing: 8,

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;