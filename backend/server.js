const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // MUST be before using env

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/products", require("./routes/productRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
