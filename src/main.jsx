import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { CupomProvider } from "./context/CupomContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <CupomProvider>
        <App />
      </CupomProvider>
    </HashRouter>
  </React.StrictMode>
);
