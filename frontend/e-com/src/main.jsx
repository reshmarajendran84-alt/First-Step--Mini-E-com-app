import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ProductsProvider } from "./context/ProductsContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
