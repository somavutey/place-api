const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: String,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
