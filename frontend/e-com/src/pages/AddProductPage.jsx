import React, { useState, useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const { addProduct } = useContext(ProductsContext);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sizes: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("sizes", JSON.stringify(form.sizes.split(","))); // convert to array
    formData.append("image", image);

    try {
      await addProduct(formData);
      toast.success("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        sizes: "",
      });
      setImage(null);
      setPreview("");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className="form-container">
        
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated) ex: S,M,L"
          value={form.sizes}
          onChange={handleChange}
        />

        <input type="file" onChange={handleImage} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
