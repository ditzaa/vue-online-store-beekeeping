const db = require("../config/db");
const products = require("../models/Product");

controller = {
  getAllProducts: async (req, res) => {
    try {
      const snapshot = await products.get();
      const productsArray = [];
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
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
  addProduct: async (req, res) => {
    try {
      const { name, price, description, stock, image, isHoney } = req.body;

      if (!name || !price || price < 0 || !description || stock < 0) {
        return res.status(400).send({ message: "Invalid product data" });
      }

      // get id from product id document
      const productIdDoc = db.collection("products").doc("productIdIndex");
      const productIdSnapshot = await productIdDoc.get();

      if (!productIdSnapshot.exists) {
        return res
          .status(500)
          .send({ message: "productIdIndex document does not exist" });
      }

      const productIdData = productIdSnapshot.data();
      const currentProductId = productIdData.productId;

      const data = {
        id: currentProductId,
        name,
        price,
        description,
        stock,
        image,
        isHoney,
      };

      const newDocument = await products
        .doc(currentProductId.toString())
        .set(data);

      await productIdDoc.update({ productId: currentProductId + 1 });

      res.status(201).send(newDocument);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const { name, price, description, stock, image, isHoney } = req.body;
      const snapshot = await products.get();
      const productsArray = [];
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
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
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const productDoc = await products.doc(productId).get();

      if (!productDoc.exists) {
        return res.status(404).send({ message: "Product not found" });
      }

      const productData = productDoc.data();
      res.status(200).send(productData);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = controller;
