import React from "react";
// import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./ThemeContext";
import { createRoot } from 'react-dom/client';
import App from "./App";
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
