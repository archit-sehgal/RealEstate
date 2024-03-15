const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Property } = require("../db/db");
const { secretKey, authenticateJwt } = require("../middleware/auth")
const router = express.Router()

//user signup
router.post("/signup", async (req, res) => {
    const { username, password,phoneNumber,userEmail } = req.body;
    const existinguser = await User.findOne({ username: username });
    if (!existinguser) {
        const newuser = new User({
            username: username,
            password: password,
            phoneNumber:phoneNumber,
            userEmail:userEmail
        })
        await newuser.save()
        const token = jwt.sign({ username, password }, secretKey)
        res.json({ message: "User created successfully", token })
    } else {
        res.status(401).json({ error: "User already exist" })
    }
});

//user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const checkuser = await User.findOne({ username: username, password: password });
    if (checkuser) {
        const token = jwt.sign({ username, password }, secretKey);

        res.json({ message: "User logged in", token: token })
    } else {
        res.status(401).json({ message: "User not found" })
    }
});

//property listing
router.post("/listproperty", authenticateJwt, async (req, res) => {
    const { purpose, ptype, pdesc, pprice, plocation, pimages } = req.body;
    const newProperty = new Property({
        pid: Math.floor(Math.random() * 100000),
        purpose: purpose,
        ptype: ptype,
        pdesc: pdesc,
        pprice: pprice,
        plocation: plocation,
        pimages: pimages,
        userid: req.user.username
    })
    const checkProperty = await Property.findOne({ pid: newProperty.pid });
    if (!checkProperty) {
        await newProperty.save();
        res.status(201).json({ message: "Property added successfully" });
    } else {
        res.status(400).json({ message: "Property already exists" });   
    }
});

//all properties
router.get("/properties", async (req, res) => {
    try {
        const properties = await Property.find({})
        res.send(properties)
    }
    catch (error) {
        res.json({ message: "error occured", error })
    }
});

//edit a property
router.post("/properties/:pid", authenticateJwt, async (req, res) => {
    const pid = req.params.pid;
    const { purpose, ptype, pdesc, pprice, plocation, pimages } = req.body;
    const findProperty = await Property.find({ pid: pid, userid: req.user.username })
    if (findProperty) {
        findProperty.purpose = purpose,
            findProperty.ptype = ptype,
            findProperty.pdesc = pdesc,
            findProperty.pprice = pprice,
            findProperty.plocation = plocation,
            findProperty.pimages = pimages;
        await findProperty.save();
        res.json({ message: "Property updated successfully", findProperty });
    } else {
        res.status(404).send("Property not found!");
    }
});

//delete a property
router.delete("/properties/:pid", authenticateJwt, async (req, res) => {
    const pid = req.params.pid;
    const findProperty = await Property.deleteOne({ pid: pid, userid: req.user.username });
    if (findProperty) {
        res.json({ message: "Property deleted successfully" })
    } else {
        res.status(404).json({ message: "Property not found" })
    }
});



module.exports = router