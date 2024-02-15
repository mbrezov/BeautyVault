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

//Delete product
/* const deleteProduct = async (req, res) => {
    const { categoryId, subcategoryId } = req.params;
    const { productId } = req.body;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const subcategory = category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(400).json({ message: "Subcategory not found" });
        }

        const product = await subcategory.products.findOneAndDelete({
            _id: productId,
        });

        console.log("Product has been deleted:", product);

        res.status(200).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(400).json({ error: error.message });
    }
}; */

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    // deleteProduct,
};
