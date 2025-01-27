// import { db } from "../services/Firebase.js";
// import { collection, getDocs } from "firebase/firestore";
const { db } = require("../config/db"); //necesar?

const { ProductModel } = require("./Product");

module.exports = {
  ProductModel,
};
