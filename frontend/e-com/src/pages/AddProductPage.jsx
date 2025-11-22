import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function AddProduct() {
  const { addProduct } = useContext(ProductsContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // Handle input changes
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    // Ensure image is not empty
    const productData = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image || "https://via.placeholder.com/150", // default image
    };

    addProduct(productData);

    alert("Product added!");
    
    // Reset form after submission
    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  }

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <input
        name="name"
        value={form.name}
        placeholder="Product Name"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        value={form.price}
        placeholder="Price"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        value={form.description}
        placeholder="Description"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        value={form.image}
        placeholder="Image URL"
        className="w-full p-2 border mb-3"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
}
