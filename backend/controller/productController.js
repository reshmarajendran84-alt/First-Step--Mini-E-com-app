const Product = require("../models/Products"); // make sure filename is exactly 'Products.js'

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    console.log("Received body:", req.body);  // log incoming data
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error saving product:", err);  // log full error
    res.status(500).json({ message: err.message });
  }
};

