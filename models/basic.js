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

module.exports = {
  Basic
};
