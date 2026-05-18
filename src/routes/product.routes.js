const router = require("express").Router();
const productController = require("../controllers/product.controller");
const upload = require("../middleware/upload.middleware");

router.post("/", upload.any(), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", upload.any(), productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;