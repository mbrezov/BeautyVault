const multer = require("multer");
const express = require("express");
const {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
} = require("../controllers/productController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//require auth for all routes
// router.use(requireAuth);

//Get all products from subcategory
router.get(
    "/category/:categoryId/subcategory/:subcategoryId/products",
    requireAuth,
    getProducts
);

//Create a new product
router.post(
    "/category/:categoryId/subcategory/:subcategoryId/products",
    requireAuth,
    upload.single("img"),
    createProduct
);

//Get product
router.get(
    "/category/:categoryId/subcategory/:subcategoryId/products/:productId",
    requireAuth,
    getProduct
);

//Delete product
router.delete(
    "/category/:categoryId/subcategory/:subcategoryId/products/:productId",
    requireAuth,
    deleteProduct
);

//update product
router.patch(
    "/category/:categoryId/subcategory/:subcategoryId/products/:productId",
    requireAuth,
    updateProduct
);

module.exports = router;
