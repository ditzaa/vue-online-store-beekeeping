const { messaging } = require("firebase-admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .send({ message: "Acces denied, no token provided." });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role != role) {
      return res
        .status(403)
        .send({ message: "Acces forbidden: insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRole };
