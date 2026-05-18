const Address = require("../models/address.model");

// GET all addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD new address only
exports.addAddress = async (req, res) => {
  try {
    const address = await Address.create({
      userId: 1,
      fullName: req.body.fullName,
      phone: req.body.phone,
      house: req.body.house,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      label: req.body.label || "Home",
      isDefault: req.body.isDefault || false,
    });

    res.status(201).json(address);
  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// EDIT address
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.update({
      fullName: req.body.fullName,
      phone: req.body.phone,
      house: req.body.house,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      label: req.body.label || "Home",
    });

    res.json(address);
  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    await Address.update({ isDefault: false }, { where: {} });

    await Address.update(
      { isDefault: true },
      { where: { id: req.params.id } }
    );

    res.json({ message: "Default updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await Address.destroy({
      where: { id: req.params.id },
    });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};