import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff'
    },
    color: {
      primary: '#173A5E',
      secondary: '#46505A',
      borderColor: 'lightgray'
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A'
    },
    action: {
      active: '#001E3C'
    },
    typography: {
      h1: 20,
      h2: 15,
      h3: 10,
      h4: 4
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
