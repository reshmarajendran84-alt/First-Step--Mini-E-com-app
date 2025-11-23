import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

export default function EditProduct() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [input, setInput] = useState(null);

  const fetchProduct = async () => {
    const res = await axios.get(`http://localhost:5002/api/products/${id}`);
    const p = res.data.data;
    setInput({
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.image[0],
    });
  };

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5002/api/products/edit/${id}`,
        { ...input, image: [input.image] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!input) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={updateProduct} className="space-y-4 max-w-lg">

        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={input.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={input.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          value={input.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
