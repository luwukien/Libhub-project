const config = require("./config.json");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user.model");
const Book = require("./models/book.model");
const { authenticateToken } = require("./utilities");

const upload = require("./multer");
const fs = require("fs");
const path = require("path");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

//Creat Account
app.post("/signup", async (req, res) => {
    const { fullName, email, password, Image } = req.body;
    if (!fullName || !email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res
            .status(400)
            .json({ error: true, message: "User already exits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    await user.save();
    const accessToken = jwt.sign(

        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.status(201).json({
        error: false,
        user: { fullName: user.fullName, email: user.email },
        accessToken,
        message: "Registration Successful",
    });


});

//Login
app.post("/login", async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Inalid Credentials" });
    } 

    const accessToken = jwt.sign(
        { userId: user.id },
        
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );
    return res.json({
        error: false,
        message: "Login Successful",
        //user: { fullName: user.fullName, email: user.email },
        accessToken,
    });

});

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { userId } = req.user
    const isUser = await User.findOne({ _id: userId });
    //console.log(userId, "\n");
    if (!isUser) {
        return res.sendStatus(401);
    }
    return res.json({
        user: isUser,
        message: "",
    });
});

//add book

app.post("/add-book", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    req.body.userId = userId;

    if (!req.body.title || !req.body.author || !req.body.category || !req.body.story || !req.body.date || !req.body.imageUrl) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedDate = new Date(parseInt(req.body.date));
    req.body.date = parsedDate;
    try {
        const book = new Book(req.body);

        await book.save();
        res.status(201).json({ story: book, message: "Added Successfully" });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }

});

//get book

app.get("/get-all-book", authenticateToken, async (req, res) => {
    const { userId } = req.user;

    try {
        const book = await Book.find({ }).sort({
            isFavourite: -1
        });
        res.status(200).json({ stories: book });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

//upload book cover
app.post("/image-upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.
                status(400)
                .json({ error: true, message: "No image uploaded" });
        }

        const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
        res.status(201).json({ imageUrl });

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

//Delete image from uploads folder
app.delete("/delete-image", async (req, res) => {
    const { imageUrl } = req.query;
    if (!imageUrl) {
        return res
            .status(400)
            .json({ error: true, message: "imageUrl is required" });
    }
    try {
        const filename = path.basename(imageUrl);
        const filePath = path.join(__dirname, 'uploads', filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return res.status(200).json({ message: "Image delete successfully" });
        } else {
            return res.status(200).json({ message: "Image not found" });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));


//Edit Book
app.post("/edit-book/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    if (!req.body.title || !req.body.category || !req.body.story || !req.body.date || !req.body.imageUrl) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedDate = new Date(parseInt(req.body.date));
    try {
        const book = await Book.findOne({ _id: id });

        if (!book) {
            return res.status(400).json({ error: true, message: "Book Story not found" });
        }
        const placeholderImgUrl = `http://localhost:8000/assets/placeholder.png`;

        book.title = req.body.title;
        book.story = req.body.story;
        book.category = req.body.category;
        book.imageUrl = req.body.imageUrl || placeholderImgUrl;
        book.date = parsedDate;

        await book.save();
        res.status(200).json({ story: book, message: 'Update successful' });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }

});

app.listen(8000);
module.exports = app;