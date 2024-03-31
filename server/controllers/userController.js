const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/userModel");

const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        res.status(200).json({ email, user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    res.json({ mssg: "Login" });
};

module.exports = {
    signupUser,
    loginUser,
};
