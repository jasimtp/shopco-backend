const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Address = require("../models/address.model");

// ✅ PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const {
      addressId,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      deliveryMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = await Order.create({
      userId: 1,
      addressId,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      paymentMethod,
      deliveryMethod,
      status: "Placed",
    });

    await Cart.destroy({ where: {} });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ❌ CANCEL ORDER
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // already delivered ആണെങ്കിൽ cancel ചെയ്യാൻ പാടില്ല
    if (order.status === "Delivered") {
      return res.status(400).json({ message: "Cannot cancel delivered order" });
    }

    await order.update({
      status: "Cancelled",
    });

    res.json({ message: "Order cancelled", order });
  } catch (error) {
    console.error("CANCEL ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Address,
          as: "address",
        },
      ],

      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ✅ UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Placed", "Shipped", "Delivered", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update({ status });

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};