const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  items: {
    type: DataTypes.JSON,
    allowNull: false,
  },

  subtotal: DataTypes.FLOAT,
  discount: DataTypes.FLOAT,
  deliveryFee: DataTypes.FLOAT,
  total: DataTypes.FLOAT,

  paymentMethod: DataTypes.STRING,
  deliveryMethod: DataTypes.STRING,

  status: {
    type: DataTypes.STRING,
    defaultValue: "Placed",
  },
});

module.exports = Order;