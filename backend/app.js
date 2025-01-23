const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

// load .env variables
dotenv.config();

// intialize app
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// routes
app.use("/", (req, res) => res.send("Hello, world!"));
//app.use("/", require("./rotues/productRoutes"));

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
