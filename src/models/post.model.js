const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const postSchema = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
   date: { type: Date, default: Date.now },
   title: { type: String },
   price: { type: String },
   description: { type: String },
   images: { type: Array },
});


module.exports = mongoose.model("post", postSchema);
