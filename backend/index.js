const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const allRouter = require("./routes/all");
const app = express();
const path = require("path");

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", allRouter);
app.use("/admin",adminRouter)
// connect to mongodb
mongoose.connect("mongodb cluster url", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


const Port = process.env.port || 3000;

app.listen(Port, () => {
    console.log("Server started on port " + Port);
});
