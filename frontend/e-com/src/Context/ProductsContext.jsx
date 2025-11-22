import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Fetch all products
  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  }

  // Add new product
  async function addProduct(product) {
    try {
      await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      fetchProducts(); // refresh list
    } catch (error) {
      console.log("Add product error:", error);
    }
  }

  // auto fetch when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}
