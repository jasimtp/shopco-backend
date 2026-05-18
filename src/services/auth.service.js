const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userRepo = require("../repositories/user.repository");

exports.register = async ({ name, email, password, role }) => {
  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

exports.forgotPassword = async ({ email }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save();

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  return {
    message: "Password reset link generated",
    resetLink: `${frontendUrl}/reset-password/${resetToken}`,
  };
};

exports.resetPassword = async ({ token, password }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const User = require("../models/user.model");

  const user = await User.findOne({
    where: {
      resetPasswordToken: hashedToken,
    },
  });

  if (!user) throw new Error("Invalid reset token");

  if (new Date(user.resetPasswordExpire).getTime() < Date.now()) {
    throw new Error("Reset token expired");
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return {
    message: "Password reset successful",
  };
};