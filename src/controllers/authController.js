const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body);

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword({
      token: req.params.token,
      password: req.body.password,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};