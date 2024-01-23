import { createTheme } from '@mui/material/styles';

// Define custom colors
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#8B0000', // Red color
    },
    secondary: {
      main: '#008080', // Teal color
    },
  },
  typography: {
    fontFamily: 'Georgia, serif', // You can change the font family
  },
  overrides: {
    MuiListItem: {
      root: {
        '&$selected': {
          color: '#8B0000', // Change the color to your preferred highlight color
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default customTheme;
