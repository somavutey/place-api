const controller = require("./../controllers/category.controller");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/place/category/create", controller.addCategory);
  app.get("/place/category/getCategory", controller.getCategory);
};
