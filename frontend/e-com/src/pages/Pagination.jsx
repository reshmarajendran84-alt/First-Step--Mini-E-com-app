import React, { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";

export default function Pagination() {
  const { page, setPage, limit, products } = useContext(ProductsContext);

  // Simple logic: show prev / next buttons
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    // If fewer products than limit, assume it's the last page
    if (products.length === limit) setPage(page + 1);
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-4 py-2">Page {page}</span>
      <button
        onClick={handleNext}
        disabled={products.length < limit}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
