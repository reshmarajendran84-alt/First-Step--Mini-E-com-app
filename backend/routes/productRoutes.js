const express = require("express");
const upload = require("../middleware/multer");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Product = require("../models/Products");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/:id", getProductById);

// ADMIN ROUTES
router.post("/", auth, admin, upload.single("image"), addProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

// LOGIN (Admin/User)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (user.password !== password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, role: user.role });
});

module.exports = router;
