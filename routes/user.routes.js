const res = require("express/lib/response");
const controller = require("../controllers/user.controller");
const { users } = require("../models");
const auth = require("../utils/auth/auth");
module.exports = (app) => {
  //app.get("/place/users", [auth.verifyToken, auth.isUser], controller.getUser);
  app.get("/place/users", controller.getUser);
  app.post("/place/users", controller.signup);
  app.post("/place/auth/signin", controller.signin);
  app.get("/place/current_user", [auth.verifyToken], controller.getCurrentUser);
  //
};
/*

//check signin (isAdmin -> somavutey@gmail,chanheng), 
res.status(kdnfkd).send("get")
is admin(
  continue() getuser
)
//article 
- CRUD {
  -users
    (read) 

    - place_owneε=ε = ε = ε = ε = ヾ(；ﾟ(OO)ﾟ)
    (CR U D)-> place 
    - admin 
  
}
//contents

*/
