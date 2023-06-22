import express from "express";
import productController from "../../controllers/productController.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:categorySlug", productController.getProductByCategory);

export default router;
