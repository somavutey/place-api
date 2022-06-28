const controller = require("../controllers/navigationBar.controller");
module.exports = (app) => {
  app.get("/place/navigations", controller.getNavigations);
  app.post("/place/navigations", controller.createNavigation);
  app.put("/place/navigations/:id", controller.updateNavigation);
  app.delete("/place/navigations/:id", controller.deleteNavigation);
};
