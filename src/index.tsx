import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LighterContextProvider } from "./context/LighterContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <LighterContextProvider>
      <App />
    </LighterContextProvider>
  </BrowserRouter>
);
