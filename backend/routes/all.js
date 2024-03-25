const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Property,Query } = require("../db/db");
const { secretKey, authenticateJwt } = require("../middleware/auth");
const router = express.Router()
const multer = require("multer");
const path = require("path");
const { pid } = require("process");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage: storage });

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
        res.json({ message: "User created successfully", token });
    } else {
        res.status(401).json({ error: "User already exist" });
    }
});

//user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const checkuser = await User.findOne({ username: username, password: password });
    if (checkuser) {
        const token = jwt.sign({ username, password }, secretKey);

        res.json({ message: "User logged in", token: token });
    } else {
        res.status(401).json({ message: "User not found" });
    }
});


router.post("/listproperty", authenticateJwt, upload.array("pimages"), async (req, res) => {
    const { purpose, ptype, pdesc, pprice, plocation } = req.body;
    const pimages = req.files.map((file) => file.filename);
  
    const newProperty = new Property({
      pid: Math.floor(Math.random() * 100000),
      purpose: purpose,
      ptype: ptype,
      pdesc: pdesc,
      pprice: pprice,
      plocation: plocation,
      pimages: pimages,
      userid: req.user.username,
    });
  
    try {
      await newProperty.save();
      res.status(201).json({ message: "Property added successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error adding property", error: error });
    }
  });

//all properties
router.get("/properties", async (req, res) => {
    try {
        const properties = await Property.find({})
        res.send(properties);
    }
    catch (error) {
        res.json({ message: "error occured", error });
    }
});

// single property fetch
router.get("/property/:pid", async (req, res) => {
    const pid = req.params.pid;
    try {
        const findProperty = await Property.findOne({ pid: pid });
        if (findProperty) {
            res.status(200).json(findProperty);
        } else {
            res.status(404).json({ message: "Property not found" });
        }
    } catch (error) {
        console.error("Error fetching property:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//send query to property owner
router.get("/queries",authenticateJwt,async(req,res)=>{
    try {
        const queries = await Query.find({ownerid:req.user.username})
        res.send(queries);
    }
    catch (error) {
        res.json({ message: "error occured", error });
    }
})

//delete query
router.delete("/delquery/:pid",authenticateJwt,async(req,res)=>{
    const pid=req.params.pid;
    try {
        const queries = await Query.deleteOne({pid:pid,ownerid:req.user.username})
        res.send(queries);
    }
    catch (error) {
        res.json({ message: "error occured", error });
    }
})

//send queries
router.post("/sendqueries",async(req,res)=>{
    const{contactPersonName,contactPersonNumber,contactPersonMessage,ownerid,pid}=req.body;
    const newQuery=new Query({
        contactPersonName:contactPersonName,
        contactPersonNumber:contactPersonNumber,
        contactPersonMessage:contactPersonMessage,
        ownerid:ownerid,
        pid:pid
    })
    try {
        await newQuery.save();
        res.status(201).json({ message: "Query added successfully" });
      } catch (error) {
        res.status(400).json({ message: "Error adding Query", error: error });
      }
})
//edit a property
router.post("/edit/:pid", authenticateJwt, async (req, res) => {
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
router.delete("/del/:pid", authenticateJwt, async (req, res) => {
    const pid = req.params.pid;
    const findProperty = await Property.deleteOne({ pid: pid, userid: req.user.username });
    if (findProperty) {
        res.json({ message: "Property deleted successfully" });
    } else {
        res.status(404).json({ message: "Property not found" });
    }
});

module.exports = router;