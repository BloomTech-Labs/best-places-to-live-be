const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  name:{
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  location: {
    type: String
  },
  cities: {
    type: Array
  },
  userSettings: {
    type: Object
  },
  userProfile: {
    type: Object
  }
});
module.exports = mongoose.model("User", userSchema);
