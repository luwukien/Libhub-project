const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName : String,
    email: String,
    password: String,
    avatar:String,
    MSSV:String,
    Birth:Date,
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = mongoose.model("User", UserSchema);  
