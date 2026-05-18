const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} = require("../controllers/cartcontroller");

router.get("/", getCart);
router.post("/add", addToCart);
router.patch("/increase/:id", increaseQty);
router.patch("/decrease/:id", decreaseQty);
router.delete("/:id", removeFromCart);

module.exports = router;