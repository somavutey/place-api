const controller = require("./../controllers/updateContent.controller");
const auth = require("../utils/auth/auth");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //get all content 
  app.get("/place/product/:id", controller.getContentById)

  app.post("/place/product",[auth.verifyToken], controller.createContent);
  app.get("/place/product/token/getbyuser",[auth.verifyToken], controller.getContentByUser)
  app.get("/place/product", controller.getContent);
  app.put("/place/product/:id", controller.updateContent);
  app.delete("/place/product/:id", controller.deleteContent);
  //search
  app.get("/place/product/:title", controller.searchContent);

  // approval 

  app.put("/place/product/approve/:id",controller.approve);

  //comment
  app.post("/place/product/comments/:contentId", [auth.verifyToken], controller.addComment)
  // delete comment
  app.delete("/place/product/comments/:contentId/:commentId", [auth.verifyToken], controller.deleteComment)


 
  // save content
  app.post('/place/product/savecontent/:contentId', [auth.verifyToken], controller.savedContents)
  // remove from saved content
  app.delete('/place/product/savecontent/:contentId', [auth.verifyToken], controller.removeSavedContents)
  //get saved content
  app.get('/place/product/savecontent/get', [auth.verifyToken], controller.findSavedContent)
};
