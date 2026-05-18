// routes/address.routes.js
const router = require("express").Router();

const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addresscontroller");

router.get("/", getAddresses);
router.post("/", addAddress);
router.put("/:id", updateAddress);       // ✅ edit/save route
router.delete("/:id", deleteAddress);
router.patch("/default/:id", setDefaultAddress);

module.exports = router;