"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#ffd400',
          contrastText: '#19170c',
        },
        secondary: {
          main: '#8a781d',
          contrastText: '#19170c',
        },
        divider: '#e6c41c',
        text: {
          primary: 'rgb(236, 235, 227)',
          secondary: 'rgba(236, 235, 227, 0.6)',
          disabled: 'rgba(236, 235, 227, 0.38)',
        },
        background: {
          default: '#19170c',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#ffd400',
          contrastText: '#19170c',
        },
        secondary: {
          main: '#8a781d',
          contrastText: '#19170c',
        },
        divider: '#e6c41c',
        text: {
          primary: 'rgb(236, 235, 227)',
          secondary: 'rgba(236, 235, 227, 0.6)',
          disabled: 'rgba(236, 235, 227, 0.38)',
        },
        background: {
          default: '#19170c',
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd400',
      contrastText: '#19170c',
    },
    secondary: {
      main: '#8a781d',
      contrastText: '#19170c',
    },
    divider: '#e6c41c',
    text: {
      primary: 'rgb(236, 235, 227)',
      secondary: 'rgba(236, 235, 227, 0.6)',
      disabled: 'rgba(236, 235, 227, 0.38)',
    },
    background: {
      default: '#19170c',
    },
  },
});

export default theme;