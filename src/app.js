const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://localhost:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());



app.get("/", (req, res) => {
  res.send("SHOP.CO Backend is running");
});

app.get("/test", (req, res) => {
  res.send("Test route working");
});
app.get("/api/products-test", (req, res) => {
  res.json({ message: "products route test working" });
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