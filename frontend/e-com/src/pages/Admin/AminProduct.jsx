import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

export default function AddProduct() {
  const { token } = useContext(AuthContext);
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5002/api/products/add",
        { ...input, image: [input.image] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product added successfully");
      setInput({ name: "", price: "", description: "", image: "" });
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      <form onSubmit={submitForm} className="space-y-4 max-w-lg">
        
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={input.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={input.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={input.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
