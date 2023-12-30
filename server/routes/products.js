const express = require("express");
const Product = require("../models/productModel");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ mssg: "GET all products" });
});

router.get("/:id", (req, res) => {
    res.json({ mssg: "GET single product" });
});

router.post("/", async (req, res) => {
    const { title, description, rating, buy, Category, SubCategory } = req.body;
    try {
        const product = await Product.create({
            title,
            description,
            rating,
            buy,
            Category,
            SubCategory,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.messge });
    }
});

router.delete("/:id", (req, res) => {
    res.json({ mssg: "Delete a product" });
});

router.patch("/", (req, res) => {
    res.json({ mssg: "Update a product" });
});

module.exports = router;
