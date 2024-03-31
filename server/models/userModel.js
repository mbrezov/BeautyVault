const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error(`Email ${email} already exists`);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt); //password hash

    const user = await this.create({
        email,
        password: hash,
    });

    return user;
};

module.exports = mongoose.model("User", userSchema);
