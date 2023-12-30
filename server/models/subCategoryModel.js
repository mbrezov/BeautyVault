const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
