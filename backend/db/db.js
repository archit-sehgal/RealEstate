const mongoose = require("mongoose");

// Define mongoose schemas

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true },
    password: { type: String, required: true },
});
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: String
});
const PropertySchema = new mongoose.Schema({
    pid: Number,
    userid: String,
    purpose: { type: String, enum: ["Sale", "Rent"] },
    ptype: { type: String, enum: ["House", "Land", "Factory", "Shop", "Showroom", "Industry", "Hotel"] },
    pdesc: {type:String},
    pprice: Number,
    plocation: { type: String || Number },
    pimages: [String]
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Property = mongoose.model('Property', PropertySchema);

module.exports = {
    User,
    Admin,
    Property
}