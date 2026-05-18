const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;