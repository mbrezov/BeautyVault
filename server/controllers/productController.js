const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const dotenv = require("dotenv");
const {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

//random image name generator
const randomImgName = () => crypto.randomBytes(32).toString("hex");

//creating s3 client bucket
const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});

//Get all products in subcategory
const getProducts = async (req, res) => {
    const { categoryId, subcategoryId } = req.params;

    try {
        const category = await Category.findById(categoryId);
        const user_id = req.user._id.toString();

        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const subcategory = category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(400).json({ message: "Subcategory not found" });
        }

        const products = subcategory.products.filter(
            (prod) => prod.user_id === user_id
        );

        products.sort((a, b) => b.rating - a.rating);

        //getting images for products
        for (const product of products) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: product.img,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            product.imgUrl = url;
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get single product in subcategory
const getProduct = async (req, res) => {
    const { categoryId, subcategoryId, productId } = req.params;

    try {
        const category = await Category.findById(categoryId);
        const user_id = req.user._id.toString();

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

        const getObjectParams = {
            Bucket: bucketName,
            Key: product.img,
        };

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        product.imgUrl = url;

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Create new product
const createProduct = async (req, res) => {
    const { categoryId, subcategoryId } = req.params;
    const { title, description, rating, buy } = req.body;
    const imgName = randomImgName();

    const params = {
        Bucket: bucketName,
        Key: imgName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    try {
        const category = await Category.findById(categoryId);
        const user_id = req.user._id.toString();

        if (!category) {
            return res.status(400).json({ message: "Category not found" });
        }

        const subcategory = category.subcategory.id(subcategoryId);

        if (!subcategory) {
            return res.status(400).json({ message: "Subcategory not found" });
        }

        await s3.send(command);

        const newProduct = {
            title,
            description,
            rating,
            buy,
            img: imgName,
            user_id,
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

        const parms = {
            Bucket: bucketName,
            Key: product.img,
        };

        const command = new DeleteObjectCommand(parms);

        await s3.send(command);

        const deletedProduct = subcategory.products.remove(productId);

        await category.save();

        res.status(200).json(deletedProduct);
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
