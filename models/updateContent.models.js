const mongoose = require("mongoose");
const updateContentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      //required: true,
    },
    phoneNumber: {
      type: Number,
      //required: true,
    },
    address: {
      type: String,
      //required: true,
    },
    proximity: {
      type: Number,
      //required: true,
    },
    latlong: [{
      type: Number,
      //required: true,
    }],
    url: [
      {
        type: String,
      },
    ],
    //categories: region, kindofplace, typeofplace,
    region: {
      type: String,

      lowercase: true,
      trim: true,
      enum: [
        "phnompenh",
        "banteaymeanchey",
        "kampongcham",
        "kampongchhnang",
        "kampongspeu",
        "kampongthom",
        "kampot",
        "kandal",
        "kandal",
        "kohkong",
        "kratie",
        "mondulkiri",
        "preahvihear",
        "battambang",
        "preyveng",
        "pursat",
        "ratanakiri",
        "siemreap",
        "preahsihanouk",
        "stungtreng",
        "svayrieng",
        "takeo",
        "oddarmeanchey",
        "kep",
        "pailin",
        "tboungkhmum",
      ],
    },
    kindofplaces: {
      type: String,

      trim: true,
      lowercase: true,
      enum: [
        "adventurous",
        "greenvillage",
        "peaceful",
        "modern",
        "fresh",
        "openspace",
        "indoor",
        "outdoor",
        "community",
        "ecofriendly",
        "minimalist",
        "aesthetic",
        "vintage",
        "outskirt",
      ],
    },
    typeofplaces: {
      type: String,
      trim: true,
      lowercase: true,
      enum: [
        "restaurant",
        "coffeeshop",
        "park",
        "amusementpark",
        "campingplace",
        "malls",
        "beach",
        "hotel",
        "resort",
        "nightclub",
        "bar",
        "mountains",
        "playroom",
        "waterfalls",
      ],
    },
    activities: {
      type: String,
      trim: true,
      lowercase: true,
      enum: [
        "eatanddrink",
        "shopping",
        "camping",
        "fishing",
        "skating",
        "sightseeing",
        "picnic",
        "watchingmovie",
        "hiking",
        "boatriding",
        "golfing",
        "scubadiving",
        "swimming",
      ],
    },
    prices: {
      type: String,

      trim: true,
      lowercase: true,
      enum: ["$lowest", "$$medium", "$$$expensive", "freeentry"],
    },
    liked: {
      type: String,
      enum: ["red", "blue"],
      default: "blue",
    },
    //approve:{
    //  type:Boolean,
    //  default:false
    //}
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"users"
    },
    comments:[
      {
        _id:{type:String, required:true},
        userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"users",
          required:true,
        },
        text:{
          type:String,
          required:true
        },
        date:{type:Date, default:Date.now()}
      }
    ]
  },

  { timestamps: true }
);
const upDateContent = mongoose.model("updateContent", updateContentSchema);
module.exports = upDateContent;
