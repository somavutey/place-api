const db = require("./../models");

const getArticleContents = async (req, res) => {
  const page = req.query.page;
  let nextPage = null;
  let prevPage = null;
  let pages;
  let limit = 1;
  if (req.query.limit <= 0 || page <= 0) {
    res.status(400).send({
      message:
        "Bad request, the value of limit or page must be greater than 0.",
    });
  }
  if (Boolean(req.query.limit)) {
    limit = req.query.limit;
  }
  try {
    const total = await db.articles.find().count();
    if (total % limit == 0) {
      pages = total / limit;
    } else {
      pages = parseInt(total / limit) + 1;
    }
    if (page) {
      const response = await db.articles
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
      if (page != 1) {
        prevPage = `http://localhost:3000/place/contents?page=${
          page - 1
        }&limit=${limit}`;
      }
      if (page < pages) {
        nextPage = `http://localhost:3000/place/contents?page=${
          page + 1
        }&limit=${limit}`;
      }
      res.status(200).send({
        data: response,
        pages: pages,
        count: response.length,
        total: total,
        firstPage: `http://localhost:3000/place/contents?page=1&limit=${limit}`,
        prevPage: prevPage,
        nextPage: nextPage,
        currentPage: `http://localhost:3000/place/contents?page=${page}&limit=${limit}`,
        lastPage: `http://localhost:3000/place/contents?page=${pages}&limit=${limit}`,
      });
    } else {
      const response = await db.articles.find();
      res.status(200).send({
        total: total,
        count: response.length,
        data: response,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Unable to get contents data!",
      statusCode: 500,
      error: error,
    });
  }
};
const createArticleContent = async (req, res) => {
  const body = req.body;
  if (Object.keys(body).length == 0) {
    return res.status(400).send({
      message: "Can't find data to create",
    });
  }
  //create article
  const create = new db.articles({
    lowerContent: body.lowerContent,
    upperContent: body.upperContent,
   // name: body.name,
    title: body.title,
    url: body.url,
  });
  try {
    const response = await create.save();
    res.status(200).send({
      message: "Created successfully",
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
const updateArticleContent = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (!body) {
    return res.status(404).send({
      message: "Can't find data to update",
    });
  }
  try {
    const response = await db.articles.findByIdAndUpdate(id, body);

    res.status(200).send({
      message: `The data with this id ${id} has been updated successfully!`,
      data: response,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      error: error,
      statusCode: 500,
    });
  }
};
const deleteArticleContent = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await db.articles.findByIdAndDelete(id);
    res.status(200).send({
      message: `Deleted document successfully with the id ${id}`,
      articles: response,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      message: `Delete document unsuccessfully with this id ${id}`,
      error: error,
      statusCode: 500,
    });
  }
};
module.exports = {
  getArticleContents,
  createArticleContent,
  updateArticleContent,
  deleteArticleContent,
};





//const { articles } = require("../models");
//const db = require("../models");
//
//{
//  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//                                Read all article content
//   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//}
//const getArticleContents = async (req, res) => {
//  const title = req.query.title;
//  const name = req.query.name;
//  const page = req.query.page;
//  let nextPage = null;
//  let prevPage = null;
//  let pages;
//  let limit = 1;
//  if (req.query.limit <= 0 || page <= 0) {
//    return res.status(400).send({
//      message: "Bad request, the value of limit, page must be greater than 0",
//      statusCode: 400,
//    });
//  }
//  return (error)
//  if (Boolean(req.query.limit)) {
//    limit = req.query.limit;
//  }
//  try {
//    const total = await db.articles.find().count();
//    if (total % limit == 0) {
//      pages = total / limit;
//    } else {
//      pages = parseInt(total / limit) + 1;
//    }
//
//    if (Boolean(title && name)) {
//      const articles = await db.articles.find({
//        $and: [{ $regex: { title } }, { $regex: { name } }],
//      });
//      res.status(200).send({
//        message: `Your result of search by title: ${title} and name of the author: ${name}`,
//        articles: articles,
//      });
//    }
//    if (title) {
//      const articles = await db.articles.find({
//        title: { $regex: title, $options: "i" },
//      });
//      res.status(200).send({
//        articles: articles,
//        statusCode: 200,
//        total: total,
//        count: articles.length,
//        message: `The result of your search input: ${title}`,
//      });
//    } else if (name) {
//      const articles = await db.articles.find({
//        name: { $regex: name, $options: "i" },
//      });
//      res.status(200).send({
//        articles: articles,
//        statusCode: 200,
//        total: total,
//        count: articles.length,
//        message: `The result of your search by name: ${name}`,
//      });
//    } else if (page) {
//      const articles = await db.articles
//        .find()
//        .skip((page - 1) * limit)
//        .limit(limit);
//      if (page != 1) {
//        prevPage = `http://localhost:3000/place/articles?page=${
//          page - 1
//        }&limit=${limit}`;
//      }
//      if (page < pages) {
//        nextPage = `http://localhost:3000/place/articles?page=${
//          Number(page) + 1
//        }&limit=${limit}`;
//      }
//      res.status(200).send({
//        pages: pages,
//        data: articles,
//        count: articles.length,
//        total: total,
//        firstPage: `http://localhost:3000/place/articles?page=1&limit=${limit}`,
//        prevPage: prevPage,
//        nextPage: nextPage,
//        currentPage: `http://localhost:3000/place/articles?page=${page}&limit=${limit}`,
//        lastPage: `http://localhost:3000/place/articles?page=${pages}&limit=${limit}`,
//      });
//    } else {
//      const articles = await db.articles.find();
//      res
//        .status(200)
//        .send({ total: total, count: articles.length, articles: articles });
//    }
//  } catch (error) {
//    res.status(500).send({
//      message: "Unable to get articles data",
//      statusCode: 500,
//      error: error,
//    });
//  }
//};
//{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Create an article content
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//const createArticleContent = async (req, res) => {
//  const body = req.body;
//  if (Object.keys(body).length == 0) {
//    return res.status(400).send({
//      message:
//        "Please add the information if not you will unable to create the content!",
//      statusCode: 400,
//    });
//  }
//  const article = new db.articles({
//    lowerContent: body.lowerContent,
//    upperContent: body.upperContent,
//    name: body.name,
//    title: body.title,
//    url: body.url,
//  });
//  try {
//    const response = await article.save();
//    res.status(200).send({
//      message: "Created an article content!",
//      statusCode: 200,
//      article: response,
//    });
//  } catch (error) {
//    res.status(500).send({
//      statusCode: 500,
//      error: error,
//      message: "Unable to create an article content!",
//    });
//    throw error;
//  }
//};
//{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Update an article content
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//}
//const updateArticleContent = async (req, res) => {
//  const id = req.params.id;
//  const body = req.body;
//  try {
//    const response = await db.articles.findByIdAndUpdate(id, body);
//    res.status(200).send({
//      article: response,
//      statusCode: 200,
//      message: "Updated!",
//    });
//  } catch (error) {
//    res.status(500).send({
//      message: "Update unsuccessfull!",
//      statusCode: 500,
//      error: error,
//    });
//    throw error;
//  }
//};
//{
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                                Delete an article content
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//}
//const deleteArticleContent = async (req, res) => {
//  const id = req.params.id;
//  try {
//    const response = await db.articles.findByIdAndDelete(id);
//    if (!response) {
//      return res.status(404).send({
//        message: `Not found with id ${id}`,
//        statusCode: 404,
//      });
//    }
//    return res.status(200).send({
//      items: response,
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
//module.exports = {
//  getArticleContents,
//  createArticleContent,
//  updateArticleContent,
//  deleteArticleContent,
//};

