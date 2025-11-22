import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function Products() {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p._id} className="border p-4 shadow rounded">
            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-gray-700">₹{p.price}</p>
            <p className="text-sm text-gray-500">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
