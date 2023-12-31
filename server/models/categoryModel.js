const mongoose = require("mongoose");

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
