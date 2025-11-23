const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    sizes: { type: Array, default: [] },
    image: { type: Array, default: [] }, // always array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
