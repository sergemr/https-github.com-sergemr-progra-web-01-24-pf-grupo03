import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e35b1', // A darker shade of purple
      contrastText: '#ffffff', // White text on primary color
    },
    secondary: {
      main: '#7e57c2', // A less dark shade of purple, but still quite deep
      contrastText: '#ffffff', // White text on secondary color
    },
    background: {
      default: '#fafafa', // A light neutral background
      paper: '#e0e0e0', // A slight grey for paper elements to contrast with the purple
    },
    text: {
      primary: '#212121', // Dark gray for primary text
      secondary: '#5e35b1', // Matching the primary color for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  // You can also customize other theme aspects here
});

export default theme;
