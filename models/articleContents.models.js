const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    lowerContent: {
      type: String,
      required: true,
    },
    upperContent: {
      type: String,
      required: true,
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    title: {
      type: String,
      required: true,
    },
    url: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamp: true,
  }
);
const Articles = mongoose.model("articles", articleSchema);

module.exports = Articles;
