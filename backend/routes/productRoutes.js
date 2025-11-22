const express = require("express");
const router = express.Router();

const { getProducts, addProduct } = require("../controller/productController"); // make sure folder is 'controller', not 'controllers'

// GET all products
router.get("/", getProducts);

// POST add product
router.post("/", addProduct); // should be "/", not "./"

module.exports = router;
