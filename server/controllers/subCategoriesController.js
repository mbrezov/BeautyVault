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

        res.status(200).json({
            ...newSubcategory,
            _id: category.subcategory[category.subcategory.length - 1]._id,
        });
    } catch (error) {
        console.error("Error creating subcategory:", error);
        res.status(400).json({ error: error.message });
    }
};

//delete subcategory in category
const deleteSubcategory = async (req, res) => {
    const { subcategoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
        return res.status(404).json({ error: "Invalid subcategory id" });
    }

    try {
        const subcategory = await Category.findOneAndUpdate(
            { "subcategory._id": subcategoryId },
            { $pull: { subcategory: { _id: subcategoryId } } },
            { new: true }
        );

        if (!subcategory) {
            return res.status(404).json({ error: "Subcategory not found" });
        }

        res.status(200).json(subcategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//update subcategory in category
const updateSubcategory = async (req, res) => {
    const { categoryId, subcategoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const subcategory = await category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        subcategory.set(req.body);

        await category.save();

        res.status(200).json(subcategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getSubcategories,
    createSubcategory,
    deleteSubcategory,
    updateSubcategory,
};
