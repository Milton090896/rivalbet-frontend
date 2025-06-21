import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind ou CSS global
import { BrowserRouter } from "react-router-dom";
import { CupomProvider } from "./context/CupomContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CupomProvider>
        <App />
      </CupomProvider>
    </BrowserRouter>
  </React.StrictMode>
);
