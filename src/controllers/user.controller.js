const User = require("../models/user.model");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "name", "email", "role", "createdAt"],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Users fetch failed",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "User delete failed",
      error: err.message,
    });
  }
};