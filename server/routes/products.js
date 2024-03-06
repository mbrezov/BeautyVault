const multer = require("multer");
const express = require("express");
const {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
} = require("../controllers/productController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Get all products from subcategory
router.get(
    "/category/:categoryId/subcategory/:subcategoryId/products",
    getProducts
);

//Create a new product
router.post(
    "/category/:categoryId/subcategory/:subcategoryId/products",
    upload.single("img"),
    createProduct
);

//Get product
router.get(
    "/category/:categoryId/subcategory/:subcategoryId/products/:productId",
    getProduct
);

//Delete product
router.delete(
    "/category/:categoryId/subcategory/:subcategoryId/products/:productId",
    deleteProduct
);

//update product
router.patch(
    "/category/:categoryId/subcategory/:subcategoryId/products/:productId",
    updateProduct
);

module.exports = router;
