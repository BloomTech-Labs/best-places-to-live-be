const mongoose = require('mongoose');

const Basic = mongoose.model(
  'Basic',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  }),
);

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
  }),
);

module.exports = {
  Basic,
  User,
};
