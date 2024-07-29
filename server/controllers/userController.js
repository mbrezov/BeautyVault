const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const User = require("../models/userModel");

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);

        //create JWT
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    signupUser,
    loginUser,
};
