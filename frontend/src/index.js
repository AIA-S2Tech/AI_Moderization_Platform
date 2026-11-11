import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './app.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
// import { BrowserRouter } from 'react-router-dom';

// Get the root element where the app will be rendered
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
// Render the App component into the root div
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
