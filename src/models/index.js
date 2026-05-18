const Order = require("./order.model");
const Address = require("./address.model");

Order.belongsTo(Address, {
  foreignKey: "addressId",
  as: "address",
});

Address.hasMany(Order, {
  foreignKey: "addressId",
  as: "orders",
});

module.exports = {
  Order,
  Address,
};