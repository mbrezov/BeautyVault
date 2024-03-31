const express = require("express");
const mongoose = require("mongoose");

const signupUser = async (req, res) => {
    res.json({ mssg: "Signup" });
};

const loginUser = async (req, res) => {
    res.json({ mssg: "Login" });
};

module.exports = {
    signupUser,
    loginUser,
};
