const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const filter = new Schema({
    title: { type:String, required: true}
});



module.exports = mongoose.model("Filter", filter);