const express = require("express")
const User = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: "invalid user" })
    }
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "user already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        })
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Server error" });

    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "invalid email or password" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user does not exists" })
        }
        const matched = await bcrypt.compare(password, user.password)
        if (!matched) {
            res.status(400).json({ message: "password does not match" })
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
}