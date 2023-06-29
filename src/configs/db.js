const mongoose = require("mongoose");

module.exports = () => {
  console.log('db')
  return mongoose.connect("mongodb+srv://user:user@cluster0.5yawhqy.mongodb.net/rentit?retryWrites=true&w=majority");

};
