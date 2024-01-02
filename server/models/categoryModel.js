/* const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: "#a6a6a6",
    },
});

module.exports = mongoose.model("Category", categorySchema);
 */

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
    },
    buy: {
        type: Boolean,
    },
});

const subcategorySchema = new mongoose.Schema({
    name: {
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
