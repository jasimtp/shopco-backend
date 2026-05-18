const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());




app.get("/", (req, res) => {
  res.send("SHOP.CO Backend is running");
});

app.get("/test", (req, res) => {
  res.send("Test route working");
});


const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const addressRoutes = require("./routes/address.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", productRoutes);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/uploads", express.static("uploads"));
module.exports = app;