const controller = require("../controllers/articleContents.controller");
module.exports = (app) => {
  app.get("/place/articles", controller.getArticleContents);
  app.post("/place/articles", controller.createArticleContent);
  app.put("/place/articles/:id", controller.updateArticleContent);
  app.delete("/place/articles/:id", controller.deleteArticleContent);
};
