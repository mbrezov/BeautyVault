const express = require("express");
const {
    getSubcategories,
    createSubcategory,
    deleteSubcategory,
    updateSubcategory,
} = require("../controllers/subcategoriesController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all routes
// router.use(requireAuth);

//Get subcategories from Category
router.get("/category/:categoryId/subcategory", requireAuth, getSubcategories);

//Create subcategory in Category
router.post(
    "/category/:categoryId/subcategory",
    requireAuth,
    createSubcategory
);

//Update subcategory in category
router.patch(
    "/category/:categoryId/subcategory/:subcategoryId",
    requireAuth,
    updateSubcategory
);

//Delete subcategory in category
router.delete(
    "/category/:categoryId/subcategory/:subcategoryId",
    requireAuth,
    deleteSubcategory
);

module.exports = router;
