const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

//get all subcategories from category
const getSubcategories = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const subcategory = category.subcategory;

        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//create subcategory in category
const createSubcategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const newSubcategory = { name };

        category.subcategory.push(newSubcategory);

        await category.save();

        console.log("New Subcategory Created:", newSubcategory);

        res.status(200).json(newSubcategory);
    } catch (error) {
        console.error("Error creating subcategory:", error);
        res.status(400).json({ error: error.message });
    }
};

//delete subcategory in category
/*TODO*/

//update subcategory in category
/*TODO*/

module.exports = {
    getSubcategories,
    createSubcategory,
};
