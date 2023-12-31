const express = require("express");
const {
    getSubcategories,
    createSubcategory,
} = require("../controllers/subcategoriesController");

const router = express.Router();

//Get subcategories from Category
router.get("/category/:categoryId/subcategory", getSubcategories);

//Create subcategory in Category
router.post("/category/:categoryId/subcategory", createSubcategory);

//Update subcategory in category
/*TODO*/

//Delete subcategory in category
/*TODO*/

module.exports = router;
