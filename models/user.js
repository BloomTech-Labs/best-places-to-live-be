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
  appleId: {
    type: String
  },
  location: {
    type: String
  },
  cities: {
    type: Array
  },
  likes: {
    type: Array
  },
  dislikes: {
    type: Array
  },
  factors: {
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
