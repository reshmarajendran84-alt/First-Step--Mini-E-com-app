import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const { addProduct } = useContext(ProductsContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "all",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await addProduct({
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image || "default-image.jpg",
      category: form.category,
    });

    alert("Product added!");
    navigate("/products");
  }

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <input
        name="name"
        placeholder="Product Name"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </form>
  );
}
