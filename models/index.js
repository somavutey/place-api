const mongoose = require("mongoose");

const upDateContent = require("./updateContent.models");
const User = require("./user.models");
const Articles = require("./articleContents.models");
//const Content = require("./updateContent.models.js");
const Navigations = require("./navigationBar.models");
const Category = require("./category.models");
const db = {};
db.mongoose = mongoose;

db.updateContent = upDateContent;
db.navigations = Navigations;
//db.contents = Content;
db.articles = Articles;
db.users = User;
db.categories = Category;

module.exports = db;
