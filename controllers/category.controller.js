const slugify = require("slugify");
const db = require("../models");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate.id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}
const addCategory = async (req, res) => {
  const name = req.body.name;
  console.log(name);
  const categoryObj = {
    name: name,
    slug: slugify(name),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  try {
    const response = await db.categories(categoryObj).save();
    res.status(200).send({
      content: response,
      count: response.length,
      statusCode: 200,
      message: "Create success!",
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "Create unsuccessfully!",
      statusCode: 500,
    });
  }
};
const getCategory = (req, res) => {
  db.categories.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).send({ error });
    }
    if (categories) {
      const categoryList = createCategories(categories);
      return res.status(200).send({ categoryList });
    }
  });
};
module.exports = {
  addCategory,
  getCategory,
};
