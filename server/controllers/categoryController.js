const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

//get all categories
const getCategories = async (req, res) => {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    res.status(200).json(categories);
};

//get single category
const getCategory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No product to display" });
    }
    const category = await Category.findById(id);

    if (!category) {
        return res.status(404).json({ error: "No product to display" });
    }

    res.status(200).json(category);
};

//create new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const product = await Category.create({
            name,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.messge });
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
};
