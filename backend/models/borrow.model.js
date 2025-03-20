const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrow = new Schema({
    borrowName:{ type:String, required: true},
    phoneNumber:{type: String, required: true},
    MSSV: {String},
    title: { type:String, required: true},
    titleNoDiacritics: { type: String},
    borrowNumber:{type: Number, required: true},
    imageUrl: {type: String},
    startDate: Date,
    endDate: Date,
    bookId: {type: String, default: ""},
    userId: {type: String, default : ""},
});

module.exports = mongoose.model("Borrow", borrow);