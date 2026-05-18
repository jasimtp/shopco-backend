const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Address = sequelize.define("Address", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fullName: DataTypes.STRING,
  phone: DataTypes.STRING,
  house: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  pincode: DataTypes.STRING,
  label: DataTypes.STRING,
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Address;