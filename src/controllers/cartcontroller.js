const Cart = require("../models/cart.model");


exports.getCart = async (req, res) => {
  try {
    const items = await Cart.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { id, productId, name, price, size, color, img, qty } = req.body;

    const finalProductId = productId || id;

    const existingItem = await Cart.findOne({
      where: {
        productId: finalProductId,
        size,
        color,
      },
    });

    if (existingItem) {
      existingItem.qty += qty || 1;
      await existingItem.save();
      return res.json(existingItem);
    }

    const item = await Cart.create({
      productId: finalProductId,
      name,
      price,
      size,
      color,
      img,
      qty: qty || 1,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.increaseQty = async (req, res) => {
  const item = await Cart.findByPk(req.params.id);
  item.qty += 1;
  await item.save();
  res.json(item);
};

exports.decreaseQty = async (req, res) => {
  const item = await Cart.findByPk(req.params.id);

  if (item.qty > 1) {
    item.qty -= 1;
    await item.save();
  }

  res.json(item);
};

exports.removeFromCart = async (req, res) => {
  await Cart.destroy({
    where: { id: req.params.id },
  });

  res.json({ message: "Item removed", id: Number(req.params.id) });
};