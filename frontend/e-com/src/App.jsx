import React from "react";
import {Routes,BrowserRouter,Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/addProduct" element={<AddProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
