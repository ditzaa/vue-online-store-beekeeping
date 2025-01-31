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
        productsArray.push(doc.data());
        if (doc.id == "mainProductsDoc" || doc.id == "productIdIndex") {
          productsArray.pop();
        }
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
  getMainProducts: async (req, res) => {
    try {
      const productsDoc = await products.doc("mainProductsDoc").get();

      if (!productsDoc.exists) {
        return res
          .status(404)
          .send({ message: "Main Products Document not found" });
      }

      const { mainProducts } = productsDoc.data();

      if (!mainProducts || mainProducts.length === 0) {
        return res.status(404).send({ message: "No main products found" });
      }

      const productPromises = mainProducts.map(async (id) => {
        const productDoc = await products.doc(id.toString()).get();
        if (!productDoc.exists) return null;

        const productData = productDoc.data();
        return {
          id: id,
          image: productData.image,
          name: productData.name,
          price: productData.price,
        };
      });

      const mainProductsDetails = (await Promise.all(productPromises)).filter(
        Boolean
      );

      res.status(200).send({
        message: "Main products sent succesfuly",
        mainProductsDetails,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  searchProducts: async (req, res) => {
    try {
      const { query } = req.query;
      const snapshot = await products.get();
      const productsArray = [];

      snapshot.forEach((doc) => {
        const product = doc.data();
        console.log(product.name);
        if (doc.id !== "mainProductsDoc" && doc.id !== "productIdIndex") {
          if (product.name.toLowerCase().includes(query.toLowerCase())) {
            productsArray.push(product);
          }
        }
      });

      res.status(200).send(productsArray);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = controller;
