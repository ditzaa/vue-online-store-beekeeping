const db = require("../config/db");
const products = db.collection("product");

controller = {
  // getAllProducts: async (req, res) => {
  //   try {
  //     const products = await firestore.collection("product");
  //     const data = await products.get();
  //     const productsArray = [];
  //     if (data.empty) {
  //       res.status(404).send("No product record found");
  //     } else {
  //       data.forEach((doc) => {
  //         const product = new ProductModel(
  //           doc.id,
  //           doc.data().name,
  //           doc.data().price
  //         );
  //         productsArray.push(product);
  //       });
  //       res.send(productsArray);
  //     }
  //   } catch (error) {
  //     res.status(400).send(error.message);
  //   }
  // },
  getAllProducts: async (req, res) => {
    try {
      const snapshot = await products.get();
      const productsArray = [];
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        productsArray.push({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().name,
        });
      });
      res.send(productsArray);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = controller;
