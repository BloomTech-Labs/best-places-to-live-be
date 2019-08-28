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
    },
    created_at: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  })
);
//name, email, password, and created_at
exports.User = User;
