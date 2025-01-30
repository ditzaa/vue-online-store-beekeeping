const db = require("../config/db");
const orders = db.collection("orders");

module.exports = orders;
