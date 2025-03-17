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
const Filter = require("./models/filter.model");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const Category = require("./models/category.model");


mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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

//Home
app.get("/home", authenticateToken, async (req, res) => {
    const { userId } = req.user
    const isUser = await User.findOne({ _id: userId });
    //console.log(userId, "\n");
    if (!isUser) {
        return res.sendStatus(401);
    }
    const categories = await Category.find({});
    return res.json({
        categories: categories,
        message: "",
    });
});

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { userId } = req.user
    const isUser = await User.findOne({ _id: userId });
    
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
        const book = new Book({
            ...req.body,
            favouriteCount: 0,
        });

        await book.save();
        res.status(201).json({ story: book, message: "Added Successfully" });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }

});

//get book

app.get("/get-all-book", authenticateToken, async (req, res) => {
    const{ userId } = req.user;
    try {
        const books = await Book.find({}).sort({ favouriteCount: -1 });
        const user = await User.findById(userId);

        const booksWithFavourite = books.map(book => {
            const isFavourite = user.favourites.includes(book._id);
            return { ...book.toObject(), isFavourite };
        });
        res.status(200).json({ stories: booksWithFavourite });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.get("/get-book/:id", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: true, message: "Book not found" });
        }

        const user = await User.findById(userId);
        const isFavourite = user.favourites.includes(book._id);

        res.status(200).json({ story: { ...book.toObject(), isFavourite } });
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

// Upload image URL
app.post("/image-upload-url", async (req, res) => {
    try {
        const { imageUrl } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({ error: true, message: "Image URL is required" });
        }

        if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(imageUrl)) {
            return res.status(400).json({ error: true, message: "Invalid image URL format" });
        }
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
app.put("/edit-book/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    if (!req.body.title || !req.body.category || !req.body.author || !req.body.story || !req.body.date) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedDate = new Date(parseInt(req.body.date));
    try {
        const book = await Book.findOne({ _id: id });

        if (!book) {
            return res.status(400).json({ error: true, message: "Book not found" });
        }
        const placeholderImgUrl = `http://localhost:8000/assets/placeholder.png`;

        book.title = req.body.title;
        book.story = req.body.story;
        book.category = req.body.category;
        book.author = req.body.author;
        book.imageUrl = req.body.imageUrl || placeholderImgUrl;
        book.date = parsedDate;
        book.remainingBook = req.body.remainingBook;

        await book.save();
        res.status(200).json({ story: book, message: 'Update successful' });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }

});

//Edit User
app.put("/edit-user", authenticateToken, async (req, res) => {
    const { userId } = req.user;

    if (!req.body.fullName || !req.body.password || !req.body.avatar || !req.body.MSSV || !req.body.phoneNumber) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        const isPasswordValid = req.body.password === user.password;
        
        if (!isPasswordValid) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
        } 


        user.fullName = req.body.fullName;
        user.MSSV = req.body.MSSV;
        user.avatar = req.body.avatar;
        user.phoneNumber = req.body.phoneNumber;

        await user.save();
        res.status(200).json({ user: user, message: 'Update successful' });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }

});

//Update Is Favourite
app.put("/update-is-favourite/:id", authenticateToken, async (req, res) => {
    const { id } = req.params; 
    const { userId } = req.user; 

    try {
        const book = await Book.findOne({ _id: id});
        if (!book) {
            return res.status(404).json({ error: true, message: "Book not found" });
        }

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        const isAlreadyFavourite = user.favourites.includes(id);
        let updatedFavourite;
        if (isAlreadyFavourite) {
            user.favourites = user.favourites.filter(bookId => bookId.toString() !== id);
            updatedFavourite = false;
            book.favouriteCount = Math.max(0, book.favouriteCount - 1);
        } else {
            user.favourites.push(id);
            updatedFavourite = true;
            book.favouriteCount += 1;
        }

        await user.save();
        await book.save();

        res.status(200).json({
            story: true,
            message: "Favourite status updated successfully",
        });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

//Delete Book
app.delete("/delete-book/:id", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;

    try {
        const book = await Book.findOne({ _id: id });
        //console.log(book);
        if (!book) {
            return res.status(404).json({ error: true, message: "Book not found" });
        }
        await book.deleteOne({ _id: id });

        const imageUrl = book.imageUrl;
        const filename = path.basename(imageUrl);

        const filePath = path.join(__dirname, 'uploads', filename);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete image file:", err);
            }
        });
        res.status(200).json({ error: "Book delete successfully" });

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

//Search Book

app.get("/search", authenticateToken, async (req, res) => {
    const { query } = req.query;
    const { userId } = req.user;

    if (!query) {
        return res.status(404).json({ error: true, message: "query is required" });
    }
    // Hàm loại bỏ dấu
    
    removeAccents(req.query.query);
    const regex = new RegExp(req.query.query, "i");

    try {
        const searchResults = await Book.find({
            $or: [
                { title: regex },
                { titleNoDiacritics: regex },
                { story: regex },
                { storyNoDiacritics: regex },
            ],
        }).sort({ isFavourite: -1 });



        res.status(200).json({ stories: searchResults });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.post("/add-filter", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    req.body.userId = userId;

    if (!req.body.title) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        const filter = new Filter({
            title: req.body.title,
        });

        await filter.save();
        res.status(201).json({ story: filter, message: "Added Successfully" });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }

});

//Get Category
app.get("/categories", authenticateToken, async (req, res) => {
    const{ userId } = req.user;
    try {
        const filters = await Filter.find({});
    
        res.status(200).json({ categories: filters });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

//Add Category
app.post("/add-category", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    req.body.userId = userId;

    if (!req.body.title || !req.body.imageUrl || !req.body.description) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        const category = new Category({
            ...req.body,
        });

        await category.save();
        res.status(201).json({ story: category, message: "Added Successfully" });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }

});


app.listen(8000);
module.exports = app;