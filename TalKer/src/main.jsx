import './scripts/firebase';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@emotion/react'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HelmetProvider } from 'react-helmet-async';
import theme from './scripts/app.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer style={{
          margin: '8px auto', // Center the container
          padding: '0 8px', // Add space inside the container from left and right
        }} />
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
