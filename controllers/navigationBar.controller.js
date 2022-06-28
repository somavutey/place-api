const db = require("./../models");

const getNavigations = async (req, res) => {
  const page = req.query.page;
  let nextPage = null;
  let prevPage = null;
  let pages;
  let limit = 1;
  if (req.query.limit <= 0 || page <= 0) {
    return res.status(400).send({
      message: "Bad request, the value of limit, page must be greater than 0",
      statusCode: 400,
    });
  }
  if (Boolean(req.query.limit)) {
    limit = req.query.limit;
  }
  try {
    const total = await db.navigations.find().count();
    if (total % limit == 0) {
      pages = total / limit;
    } else {
      pages = parseInt(total / limit) + 1;
    }
    if (page) {
      const response = await db.navigations
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (page != 1) {
        prevPage = `http://localhost:3000/place/contents?page=${
          page - 1
        }&limit=${limit}`;
      }
      if (page < pages) {
        nextPage: `http://localhost:3000/place/contents?page=${
          page + 1
        }&limit=${limit}`;
      }
      res.status(200).send({
        data: response,
        pages: pages,
        count: contents.length,
        total: total,
        firstPage: `http://localhost:3000/place/contents?page=1&limit=${limit}`,
        prevPage: prevPage,
        nextPage: nextPage,
        currentPage: `http://localhost:3000/place/contents?page=${page}&limit=${limit}`,
        lastPage: `http://localhost:3000/place/contents?page=${pages}&limit=${limit}`,
      });
    } else {
      const response = await db.navigations.find();
      res.status(200).send({
        total: total,
        count: response.length,
        data: response,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error",
      statusCode: 500,
      error: error,
    });
  }
};
const createNavigation = async (req, res) => {
  const body = req.body;
  if (Object.keys(body).length == 0) {
    res.status(404).send({
      message: "Bad request, please input data to create ",
    });
  }
  const create = new db.navigations({
    title: body.title,
    path: body.path,
    type: body.type,
  });
  try {
    const response = await create.save();
    res.status(200).send({
      message: "Created successfully",
      data_created: response,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error",
      statusCode: 500,
      error: error,
    });
  }
};
const updateNavigation = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (Object.keys(body).length == 0)
    return res.status(404).send({
      message: "Bad request, please input data to update",
    });
  try {
    const response = await db.navigations.findByIdAndUpdate(id, body);
    res.status(200).send({
      message: `Data updated with this id ${id}`,
      statusCode: 200,
      data: response,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error",
      error: error,
      statusCode: 500,
    });
  }
};
const deleteNavigation = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.navigations.findByIdAndDelete(id);
    res.status(200).send({
      message: `Deleted the document successfully with the id ${id}`,
      statusCode: 200,
      data: response,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error",
      statusCode: 500,
      error: error,
    });
  }
  // res.status(200).send({ message: "Delete navigation" });
};
module.exports = {
  getNavigations,
  createNavigation,
  updateNavigation,
  deleteNavigation,
};

//const db = require("../models");
//{
//  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//                                Read all navigation list
//   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//}
//const getNavigations = async (req, res) => {
//  try {
//    const response = await db.navigations.find();
//    res.status(200).send({
//      message: "Read all the navigation lists!",
//      statusCode: 200,
//      count: response.length,
//      navigaions: response,
//    });
//  } catch (error) {
//    res.status(500).send({
//      statusCode: 500,
//      error: error,
//      message: "Unable to read all the navigation lists!",
//    });
//  }
//};
//{
//  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//                                Create a navigation list
//   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//}
//const createNavigation = async (req, res) => {
//  const body = req.body;
//  const title = req.body.title;
//  if (Object.keys(body).length == 0) {
//    res.status(400).send({
//      message: "Please input the data before create a navigtion list!",
//      statusCode: 400,
//    });
//  }
//  const navigation = new db.navigations({
//    title: body.title,
//    path: body.path,
//  });
//
//  try {
//    const response = await navigation.save();
//    res.status(200).send({
//      message: "Created a navigation bar list",
//      status: 200,
//      navigation: response,
//    });
//  } catch (error) {
//    res.status(500).send({
//      message: "Unable to create a navigation list",
//      statusCode: 500,
//      error: error,
//    });
//  }
//};
//{
//  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//                                Update a navigation list
//   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//}
//const updateNavigation = async (req, res) => {
//  const id = req.params.id;
//  const body = req.body;
//  try {
//    const response = await db.navigations.findByIdAndUpdate(id, body);
//    res.status(200).send({
//      message: "Updated!",
//      statusCode: 200,
//      navigation: response,
//    });
//  } catch (error) {
//    res.status(500).send({
//      message: "Unable to create a navigation bar list",
//      error: error,
//      statusCode: 500,
//    });
//  }
//};
//{
//  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//                              Delete a navigation list
//   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//}
//const deleteNavigation = async (req, res) => {
//  const id = req.params.id;
//  try {
//    const response = await db.navigations.findByIdAndDelete(id);
//    if (!response) {
//      res.status(404).send({
//        message: `Deleted the id ${id}`,
//        statusCode: 404,
//        navigation: response,
//      });
//    }
//    res.status(200).send({
//      navigaion: response,
//      message: `Deleted id: ${id}`,
//      statusCode: 200,
//    });
//  } catch (error) {
//    res.status(500).send({
//      error: error,
//      statusCode: 500,
//    });
//  }
//};
//
//module.exports = {
//  getNavigations,
//  createNavigation,
//  updateNavigation,
//  deleteNavigation,
//};
