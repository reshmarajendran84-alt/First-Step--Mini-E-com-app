import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsContext";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  return (
    <ProductsProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

export default App;
