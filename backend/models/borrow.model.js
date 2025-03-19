const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrow = new Schema({
  title: { type:String, required: true},
  imageUrl: {type: String, required: true},
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: string
});

module.exports = mongoose.model("Borrow", borrow);