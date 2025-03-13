const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const book = new Schema({
    title: { type:String, required: true},
    titleNoDiacritics: { type: String},
    category: {type: [String], default: []},
    author: { type: String, required: true},
    story: { type:String, required: true},
    storyNoDiacritics: { type:String},
    isFavourite:{type:Boolean, required:false},
    imageUrl: {type: String, required: true},
    date: Date,
    remainingBook: {type: Number, required: true},
    favouriteCount: { type: Number, default: 0 },
});



module.exports = mongoose.model("Book", book);