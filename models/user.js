const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    profile: {
      type: Object,
      required: true,
      unique: true
    },
    accessToken: {
      type: String,
      unique: true
    },
    refreshToken: {
      type: String,
      unique: true
    }
  })
);

exports.User = User;
