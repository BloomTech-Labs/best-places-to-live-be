const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  cost_of_living: {
    type: String,
  },
  avg_commute_time: {
    type: Number,
  },
});

module.exports = mongoose.model("City", citySchema);
