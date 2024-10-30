import { createTheme } from '@mui/material/styles';

// Mui Theme
const theme = createTheme({
    palette: {
      background: {
        default: '#212121', // Sets background color for the entire app
      },
      primary: {
        main: '#B4B4B4', // Customize your primary color
      },
      secondary: {
        main: '#2F2F2F', // Customize your secondary color
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif', // Set the font for the entire app
      h6: {
        fontWeight: 600, // Customize specific variant like your navbar title
      },
      // Customize more typography variants if needed
    },
  });
  
  export default theme;