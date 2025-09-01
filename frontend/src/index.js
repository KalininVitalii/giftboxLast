import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Performance optimization: Use React 18's concurrent features
const root = ReactDOM.createRoot(document.getElementById("root"));

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
