const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const {Admin,Property}=require("../db/db");
const {secretKey,checkAdminAccess}=require("../middleware/auth")
const router=express.Router()

//admin signup route
router.post("/signup", async (req, res) => {
    const { adminid, password } = req.body;
    const existingadmin = await Admin.findOne({ adminid: adminid });
    if (!existingadmin) {
        const newadmin = new Admin({
            adminid: adminid,
            password: password,
        })
        await newadmin.save()
        const token = jwt.sign({ adminid, password }, secretKey)
        res.json({ message: "Admin created successfully", token })
    } else {
        res.status(401).json({ error: "Admin already exist" })
    }
});

//admin login route
router.post("/login", async (req, res) => {
    const { adminid, password } = req.body;
    const CheckAdmin = await Admin.findOne({ adminid: adminid, password: password })
    if (!CheckAdmin) {
        res.status(401).json({ message: "Un-Authorized" })
    } else {
        const token = jwt.sign({ adminid, password }, secretKey);
        res.json({ message: "Admin logged in", token: token })
    }
});
module.exports=router
