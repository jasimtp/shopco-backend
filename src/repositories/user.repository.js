const User = require("../models/user.model");

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.findByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};