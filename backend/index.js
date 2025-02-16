const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

app.get("/hello", async(req, res) => {
    return res.status(200).json({message: "Hello"});
});

app.listen(8000);
module.exports = app;