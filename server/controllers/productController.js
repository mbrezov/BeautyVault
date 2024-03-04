const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

//Get all products in subcategory
const getProducts = async (req, res) => {
    const { categoryId, subcategoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const subcategory = category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(400).json({ message: "Subcategory not found" });
        }

        const products = subcategory.products;

        res.status(200).json(products); //Sort needs to be added here (-1 or something like that)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get single product in subcategory
const getProduct = async (req, res) => {
    const { categoryId, subcategoryId, productId } = req.params;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const subcategory = category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(400).json({ message: "Subcategory not found" });
        }

        const product = subcategory.products.id(productId);

        if (!product) {
            return res.status(400).json({ message: "product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Create new product
const createProduct = async (req, res) => {
    const { categoryId, subcategoryId } = req.params;
    const { title, description, rating, buy } = req.body;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const subcategory = category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(400).json({ message: "Subcategory not found" });
        }

        const newProduct = {
            title,
            description,
            rating,
            buy,
        };

        subcategory.products.push(newProduct);

        await category.save();

        console.log("New Product created:", newProduct);

        res.status(200).json({
            ...newProduct,
            _id: subcategory.products[subcategory.products.length - 1]._id,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({ error: error.message });
    }
};

//Update product
const updateProduct = async (req, res) => {
    const { categoryId, subcategoryId, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product Id" });
    }

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(400).json({
                error: "Category not found. Please make sure that Id is valid.",
            });
        }

        const subcategory = category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(400).json({
                message:
                    "Subcategory not found. Please make sure that Id is valid.",
            });
        }

        const product = subcategory.products.id(productId);

        if (!product) {
            return res.status(400).json({
                message:
                    "Product not found. Please make sure that Id is valid.",
            });
        }

        product.set(req.body);

        await category.save();

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

//Delete product
const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid product Id" });
    }

    try {
        const products = await Category.findOneAndUpdate(
            { "subcategory.products._id": productId },
            { $pull: { "subcategory.$.products": { _id: productId } } },
            { new: true }
        );

        if (!products) {
            return res.status(400).json({ error: "Product not found" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
};
