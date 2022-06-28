const mongoose = require("mongoose");
const navSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Navigations = mongoose.model("navigations", navSchema);
module.exports = Navigations;
