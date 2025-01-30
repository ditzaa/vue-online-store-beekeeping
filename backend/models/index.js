const { db } = require("../config/db"); //necesar?

const products = require("./Product");
const orders = require("./Order");

module.exports = {
  products,
  orders,
};
