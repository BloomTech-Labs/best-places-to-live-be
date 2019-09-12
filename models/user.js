const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  cities: {
    type: Array
  }
});

module.exports = mongoose.model("User", userSchema);
