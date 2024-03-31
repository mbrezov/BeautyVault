const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
    //validation
    if (!email || !password) {
        throw Error("All fileds must be filled");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not string enough");
    }

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

//static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fileds must be filled");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error(`Incorrect E-mail`);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

module.exports = mongoose.model("User", userSchema);
