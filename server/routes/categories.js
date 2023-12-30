const express = require("express");
const {
    getCategories,
    getCategory,
    createCategory,
} = require("../controllers/categoryController");

const router = express.Router();

//Get all categories
router.get("/", getCategories);

//Get single category
router.get("/:id", getCategory);

//Create category
router.post("/", createCategory);

module.exports = router;
