const express = require("express");
const {
    getCategories,
    getCategory,
    createCategory,
} = require("../controllers/categoryController");

const router = express.Router();

//Get all categories
router.get("/categories", getCategories);

//Get single category
router.get("/category/:id", getCategory);

//Create category
router.post("/category", createCategory);

module.exports = router;
