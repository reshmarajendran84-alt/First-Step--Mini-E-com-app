import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProductsProvider } from "./Context/ProductsContext";

import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";

import AdminRoute from "./components/AdminRoute";
import AdminProducts from "./pages/Admin/AdminProducts";
import AddProduct from "./pages/AddProductPage";
import EditProduct from "./pages/Admin/EditProduct";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Navigate to="/products" />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }/>

        <Route path="/add-product" element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        }/>

        <Route path="/admin/edit/:id" element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        }/>

      </Routes>
    </Router>
  );
}

export default App;
