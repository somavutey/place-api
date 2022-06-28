const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan")
app.use(bodyParser.urlencoded());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const port = process.env.port;
const connectionDB = require("./utils/db/connection");
// cors provides Express middleware to enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(morgan(('tiny')))
connectionDB();

//all routes

require("./routes/updateContent.routes")(app);

require("./routes/user.routes")(app);

require("./routes/category.routes")(app);

require("./routes/navigationBar.routes")(app);
require("./routes/articleContents.routes")(app);
app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
