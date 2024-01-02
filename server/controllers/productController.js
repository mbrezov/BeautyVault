/* const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/productModel");

//get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json(products);
};

//get single product
const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No product to display" });
    }
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ error: "No product to display" });
    }

    res.status(200).json(product);
};

//create new product
const createProduct = async (req, res) => {
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
};

//delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No product to delete" });
    }

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
        return res.status(404).json({ error: "No product to delete" });
    }

    res.status(200).json(product);
};

//update product
const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No product to update" });
    }

    const product = await Product.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!product) {
        return res.status(404).json({ error: "No product to update" });
    }

    res.status(200).json(product);
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
};
 */
