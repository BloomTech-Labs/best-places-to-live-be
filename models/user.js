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
  google: {
    id:String,
    token:String,
    email:String,
    name:String
  },
  googleId:{
    type:String
  },
  token:{
    type:String
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
