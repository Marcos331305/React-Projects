import { createTheme } from '@mui/material/styles';
import '@fontsource/outfit/';
import '@fontsource/montserrat'

const theme = createTheme({
  typography: {
    fontFamily: 'Outfit, Arial, sans-serif',
    logoFont: {
      fontFamily: 'Montserrat, Arial, sans-serif'
    }
  },
  palette: {
    background: {
      default: "#161513", // Define the background color here
      paper: "#ffffff",   // You can also define background for paper components like Card
    },
  },  
});

export default theme;
