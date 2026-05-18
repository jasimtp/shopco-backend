const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cart = sequelize.define("Cart", {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: DataTypes.STRING,
  price: DataTypes.FLOAT,
  size: DataTypes.STRING,
  color: DataTypes.STRING,
  img: DataTypes.STRING,
  qty: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = Cart;