const db = require("../config/db");
const products = db.collection("products");

module.exports = products;
