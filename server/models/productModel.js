const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
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
        Category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: false,
        },
        SubCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            required: false,
        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
