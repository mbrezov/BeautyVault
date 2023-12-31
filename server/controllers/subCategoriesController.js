const express = require("express");
const mongoose = require("mongoose");
const subCategory = require("../models/subCategoryModel");

//get all subCategories
const getSubCategories = async (req, res) => {
    const subCategories = await subCategory.find({}).sort({ createdAt: -1 });

    res.status(200).json(subCategories);
};

//get single subCategory
const getSubCategory = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No product to display" });
    }
    const sub = await subCategory.findById(id);

    if (!sub) {
        return res.status(404).json({ error: "No product to display" });
    }

    res.status(200).json(sub);
};

//create new subCategory
const createSubCategory = async (req, res) => {
    const { name, Category } = req.body;
    try {
        const sub = await subCategory.create({
            name,
            Category,
        });
        res.status(200).json(sub);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getSubCategories,
    getSubCategory,
    createSubCategory,
};
