import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import App from './App';
import theme from './theme/theme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1A1A1A',
                color: '#E0E0E0',
                border: '1px solid #FFD700',
              },
              success: {
                iconTheme: {
                  primary: '#FFD700',
                  secondary: '#0D0D0D',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF6B6B',
                  secondary: '#0D0D0D',
                },
              },
            }}
          />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
); 