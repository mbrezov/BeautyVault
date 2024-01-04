const express = require("express");
const {
    getProducts,
    createProduct,
    //deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

//Get all products
router.get(
    "/category/:categoryId/subcategory/:subcategoryId/products",
    getProducts
);

//Create a new product
router.post(
    "/category/:categoryId/subcategory/:subcategoryId/products",
    createProduct
);

//Delete product
/* router.delete(
    "/category/:categoryId/subcategory/:subcategoryId/products",
    deleteProduct
); */

module.exports = router;
