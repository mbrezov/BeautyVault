const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    buy: {
        type: Boolean,
        required: true,
    },
    img: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    user_id: {
        type: String,
        required: true,
    },
});

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    products: [productSchema],
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: "#a6a6a6",
    },

    subcategory: [subcategorySchema],
});

module.exports = mongoose.model("Category", categorySchema);
