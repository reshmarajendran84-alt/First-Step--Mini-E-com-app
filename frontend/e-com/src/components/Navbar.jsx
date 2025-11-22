import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { search, setSearch } = useContext(ProductsContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex flex-col sm:flex-row justify-between items-center">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer mb-2 sm:mb-0"
        onClick={() => navigate("/products")}
      >
        MiniShop
      </h1>

      {/* Navigation Links */}
      <div className="flex gap-4 items-center mb-2 sm:mb-0">
        <Link
          to="/products"
          className="hover:text-gray-300 transition"
        >
          Products
        </Link>
        <Link
          to="/add-product"
          className="hover:text-gray-300 transition"
        >
          Add Product
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search products..."
        className="p-2 rounded border border-gray-300 text-black w-full sm:w-64"
      />
    </nav>
  );
}
