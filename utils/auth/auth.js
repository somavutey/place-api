const jwt = require("jsonwebtoken");
const db = require("../../models");
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ message: "Invalid Authentication" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.userId = decoded.userId;
  next()
};
const isAdmin = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).send({ message: "Invalid Authentication." });
  }
  const user = await db.users.findById(userId);
  if (user.role != "admin") {
    return res.status(401).send({ message: "required admin role" });
  }
  next();
};
const isPlaceOwner = async (req, res, next) => {
  //const userId = req.userId;
  //if (!userId) {
  //  return res.status(401).send({ message: "Invalid Authentication." });
  //}
  //const user = await db.users.findById(userId);
  //if (user.role != "place_owner") {
  //  return res.status(401).send({ message: "required place_owner role" });
  //}
  next();
};
const isUser = async (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).send({ message: "Invalid Authentication." });
  }
  const user = await db.users.findById(userId);
  if (user.role != "user") {
    return res.status(401).send({ message: "required place_owner role" });
  }
  next();
};
module.exports = { verifyToken, isAdmin, isPlaceOwner, isUser };
