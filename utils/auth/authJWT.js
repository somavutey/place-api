const jwt = require("jsonwebtoken");
const db = require("../../models");
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send({
      message: "Invalid Authentication",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: "Unauthorized!" });
    }
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  });
  
};
const isAdmin = async (req, res, next) => {
  const userId = req.userId;
  if (!userId)
    return res.status(401).send({ messsage: "Invalid Authentication." });
  const user = await db.role.findById(userId);
  if (user.role != "admin") {
    return res.status(401).send({ messsage: "required admin role" });
  }
  console.log(user);
  next();
};
const isSuperUser = async (req, res, next) => {
  const userId = req.userId;
  if (!userId)
    return res.status(401).send({ messsage: "Invalid Authentication." });
  const user = await db.role.findById(userId);
  if (user.role != "super_user") {
    return res.status(401).send({ messsage: "required admin role" });
  }
  console.log(user);
  next();
};
const isUser = async (req, res, next) => {
  const userId = req.userId;
  if (!userId)
    return res.status(401).send({ messsage: "Invalid Authentication." });
  const user = await db.role.findById(userId);
  if (user.role != "user") {
    return res.status(401).send({ messsage: "required admin role" });
  }
  console.log(user);
  next();
};
module.exports = { verifyToken, isAdmin };
