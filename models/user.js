const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    // unique: true,
  },
  refreshToken: {
    type: String,
    // unique: true,
  },
  providerid: {
    type: String,
    // unique: true,
  },
  provider: {
    type: String,
    // unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  locale: {
    type: String,
  },
  created_at: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
