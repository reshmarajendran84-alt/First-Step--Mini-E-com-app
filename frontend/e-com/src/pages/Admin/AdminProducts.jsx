import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5002/api/products");
    setProducts(res.data.data);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5002/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-5 rounded shadow">
            <img src={p.image[0]} alt="" className="w-full h-40 object-cover rounded" />
            <h3 className="font-semibold mt-3">{p.name}</h3>
            <p>₹{p.price}</p>

            <div className="mt-4 flex justify-between">
              <Link
                to={`/admin/edit/${p._id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
