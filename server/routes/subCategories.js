const express = require("express");
const {
    getSubCategories,
    getSubCategory,
    createSubCategory,
} = require("../controllers/subCategoriesController");

const router = express.Router();

//Get all categories
router.get("/", getSubCategories);

//Get single category
router.get("/:id", getSubCategory);

//Create category
router.post("/", createSubCategory);

module.exports = router;
