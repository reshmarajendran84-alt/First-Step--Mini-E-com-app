import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ProductsProvider } from "./Context/ProductsContext";
import { AuthProvider } from "./Context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <App />
        <Toaster position="top-center" />
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);
