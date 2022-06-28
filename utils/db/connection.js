const db = require("./../../models");

const connectionDB = async () => {
  try {
    await db.mongoose.connect(
      "mongodb+srv://Soma_vutey:Vutey11jan@cluster0.3gecr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    ); // waiting connect to mongodb
    console.log("*** ===Database is connected=== ***");
  } catch (error) {
    throw error;
  }
};

module.exports = connectionDB;
