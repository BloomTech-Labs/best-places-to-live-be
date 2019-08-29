const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    accessToken: {
      type: String,
      unique: true
    },
    refreshToken: {
      type: String,
      unique: true
    },
    providerid: {
      type: String,
      unique: true
    },
    provider: {
      type: String,
      unique: true
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
    },
    locale: {
      type: String
    },
    created_at: {
      type: String
    }
  })
);
//name, email, password, and created_at
exports.User = User;