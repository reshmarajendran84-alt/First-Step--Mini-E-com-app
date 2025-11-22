import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function ProductsPage() {
  const {
    products,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useContext(ProductsContext);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Category"
          className="p-2 border rounded"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="none">Sort</option>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="border p-2 rounded shadow">
            <img
              src={p.image || "default-image.jpg"}
              alt={p.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h2 className="font-bold">{p.name}</h2>
            <p>${p.price}</p>
            <p className="text-sm text-gray-500">{p.category}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
