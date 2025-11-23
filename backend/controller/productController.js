const Product = require("../models/Products");

// GET all with search + filter + sort + pagination
const getProducts = async (req, res) => {
  try {
    const { search = "", category = "", sort = "", page = 1, limit = 6 } = req.query;

    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const sortOption = {};
    if (sort === "low") sortOption.price = 1;
    if (sort === "high") sortOption.price = -1;

    const skip = (page - 1) * limit;

    const data = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      data,
      meta: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// GET by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// ADD product
const addProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      image: imagePath ? [imagePath] : [],
    });

    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
