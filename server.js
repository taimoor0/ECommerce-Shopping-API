const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect Database
connectDB();

// Route Files
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const cart = require("./routes/cart");
const order = require("./routes/order");

// Creating Application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount Routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/product", product);
app.use("/api/v1/cart", cart);
app.use("/api/v1/order", order);

app.use(errorHandler);

// Server Running
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server is ruuning on port ${PORT}`);
});
