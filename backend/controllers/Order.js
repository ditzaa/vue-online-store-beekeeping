const db = require("../config/db");
const orders = require("../models/Order");

controller = {
  addOrder: async (req, res) => {
    try {
      const {
        clientName,
        email,
        phone,
        county,
        locality,
        cart,
        cartQuantity,
        totalPrice,
      } = req.body;

      if (
        !clientName ||
        !county ||
        !email ||
        !phone ||
        !locality ||
        cart == {} ||
        cartQuantity == {} ||
        totalPrice < 0
      ) {
        return res.status(400).send({ message: "Invalid order data" });
      }

      const orderIdDoc = orders.doc("orderIdIndex");
      const orderIdSnapshot = await orderIdDoc.get();
      if (!orderIdSnapshot.exists) {
        return res
          .status(500)
          .send({ message: "orderIdIndex document does not exist" });
      }

      const orderIdData = orderIdSnapshot.data();
      const currentOrderId = orderIdData.orderId;

      const status = "In asteptare";

      const newOrderData = {
        clientName,
        email,
        phone,
        county,
        locality,
        cart,
        cartQuantity,
        totalPrice,
      };

      const newOrderRef = await orders
        .doc(currentOrderId.toString())
        .set(newOrderData);
      // const savedOrder = await newOrderRef.get();
      // const orderData = savedOrder.data();

      await orderIdDoc.update({ orderId: currentOrderId + 1 });

      res.status(201).send({
        // newOrder: orderData,
        message: "Order placed succesfuly.",
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const snapshot = await orders.get();
      const ordersArray = [];
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        ordersArray.push({
          id: doc.id,
          clientName: doc.data().clientName,
          county: doc.data().county,
          locality: doc.data().locality,
          productNames: doc.data().productNames,
          productAmounts: doc.data().productAmounts,
          status: doc.data().status,
          totalPrice: doc.data().totalPrice,
        });
        if (doc.id == "orderIdIndex") {
          ordersArray.pop();
        }
      });
      res.send(ordersArray);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      const orderDoc = await orders.doc(orderId).get();

      if (!orderDoc.exists) {
        return res.status(404).send({ message: "Order not found" });
      }

      const orderData = orderDoc.data();
      res.status(200).send(orderData);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

module.exports = controller;
