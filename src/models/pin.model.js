const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const pinSchema = new mongoose.Schema({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
   date: { type: Date, default: Date.now },
   title: { type: String },
   price: { type: String },
   description: { type: String },
   images: { type: Array },
   long: {type: Number},
   lat: {type: Number},
});


module.exports = mongoose.model("pin", pinSchema);
