const { uploadV1Product } = require("../../../middleware/upload");
const { getProducts, getSingleProduct, updateProduct, deleteProduct, postProduct } = require("./controllers");
const router = require("express").Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", uploadV1Product, postProduct);
router.patch("/:id", uploadV1Product, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
