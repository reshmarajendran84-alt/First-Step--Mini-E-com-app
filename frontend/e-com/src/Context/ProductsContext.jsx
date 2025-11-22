import { createContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;

  // Fetch all products from backend
  async function fetchProducts() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    setProducts(data);
  } catch (error) {
    console.log("Fetch error:", error);
  }
}

async function addProduct(product) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend error response:", errorData);
    } else {
      fetchProducts();
    }
  } catch (error) {
    console.log("Add product error:", error);
  }
}


  // Filter, search, sort, and paginate products
  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p =>
      category === "all" ? true : p.category === category
    )
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + PRODUCTS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Auto fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products: paginatedProducts,
        addProduct,
        fetchProducts,
        search,
        setSearch,
        category,
        setCategory,
        sort,
        setSort,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
