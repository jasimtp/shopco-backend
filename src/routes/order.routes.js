const router = require("express").Router();

const {
  placeOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder
} = require("../controllers/ordercontroller");

router.post("/", placeOrder);
router.get("/", getOrders);
router.get("/my-orders", getOrders);
router.patch("/status/:id", updateOrderStatus);
router.patch("/cancel/:id", cancelOrder);

module.exports = router;