const db = require("../models");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//check current user

const signup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  //To prevent from the body is empty
  if (Object.keys(req.body).length == 0) {
    return res.status(400).send({
      message: "Cannot signup with empty data",
    });
  }
  //To check if the email is valid
  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Your email is invalid",
    });
  }
  //Check if the password is greater than 6 digits and less than or equal 12 digits
  if (!(password.length > 6 && password.length <= 12)) {
    return res
      .status(400)
      .send(
        "Please note that your password must contain more than 6 digits and less than or equal 12 digits"
      );
  }
  try {
    //To check if the email is already exist
    const user = await db.users.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .send({ message: "This email is already in used." });
    }
    const newUser = new db.users({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 8),
      role,
    });
    const result = await newUser.save();
    return res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ message: error || "Error is occured." });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.users.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "Not found user" });
    }
    const isRightPassword = bcrypt.compareSync(password, user.password);
    if (!isRightPassword) {
      return res.status(400).send({ message: "Your password is not match" });
    }
    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          return res.status(401).send({ error: err });
        }
        res.status(200).send({data:{
          _id:user._id,
          firstName: user.firstName,
          lastName:user.lastName,
          email:user.email,
          token:token,
          role:user.role,

         }});
      }
    );
  } catch (error) {
    res.status(500).send({ Error: error || "Error is occured" });
  }
};
const getUser = async (req, res) => {
  try {
    const users = await db.users.find();
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
const updateUser = async (req, res) => {
  res.status(200).send("Signin");
};
const deleteUser = async (req, res) => {
  res.status(200).send("Signin");
};
const getCurrentUser = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(200).send({
      message: "Unauthorized",
    });
  }
  const user = await db.users.findById(userId);
  if (!user) {
    res.status(400).send({
      message: "No current user",
    });
  } else {
    res.status(200).send({
      message: "Success get current user",
      data: user,
    });
  }
};

module.exports = {
  signup,
  signin,
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
};
