const express = require("express");
const {
    getCategories,
    getCategory,
    createCategory,
} = require("../controllers/categoryController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all routes
// router.use(requireAuth);

//Get all categories
router.get("/categories", requireAuth, getCategories);

//Get single category
router.get("/category/:id", requireAuth, getCategory);

//Create category
router.post("/category", requireAuth, createCategory);

module.exports = router;
