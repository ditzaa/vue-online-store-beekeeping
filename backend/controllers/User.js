const db = require("../config/db");
const users = db.collection("users");
const products = db.collection("products");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
require("dotenv").config();

controller = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone, adress, locality, county } =
        req.body;

      if (
        !name ||
        !email ||
        !password ||
        !phone ||
        !adress < 0 ||
        !locality ||
        !county
      ) {
        return res.status(400).send({ message: "Invalid user register data" });
      }

      const existingUser = await users.where("email", "==", email).get();
      if (!existingUser.empty) {
        return res.status(400).send({ message: "User already exists" });
      }

      const userIdDoc = users.doc("userIdIndex");
      const userIdSnapshot = await userIdDoc.get();
      if (!userIdSnapshot.exists) {
        return res
          .status(500)
          .send({ message: "userIdIndex document does not exist" });
      }

      const userIdData = userIdSnapshot.data();
      const currentUserId = userIdData.userId;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        adress: adress,
        locality: locality,
        county: county,
        id: currentUserId,
        role: "client",
        favoriteProducts: [],
      };

      const newDocument = await users
        .doc(currentUserId.toString())
        .set(newUser);
      await userIdDoc.update({ userId: currentUserId + 1 });

      res.status(201).send({
        message: "User registered successfully",
        newUser: newDocument,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "Email and password are required" });
      }

      const userQuery = await users.where("email", "==", email).get();
      if (userQuery.empty) {
        return res.status(404).send({ message: "User does not exist" });
      }

      // get user data
      const userDoc = userQuery.docs[0];
      const user = userDoc.data();

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid password" });
      }
      const token = generateToken(user.id, user.role);
      res
        .status(200)
        .send({ message: "User logged in succesfuly", token, user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  registerAdmin: async (req, res) => {
    try {
      const { email, password, adminPass } = req.body;

      if (!email || !password || !adminPass) {
        return res.status(400).send({ message: "Invalid admin register data" });
      }

      if (adminPass != process.env.ADMIN_PASS) {
        return res.status(403).send({
          message: "Unauthorized user tries to register as an admin!",
        });
      }

      const existingAdmin = await users.where("email", "==", email).get();
      if (!existingAdmin.empty) {
        return res.status(400).send({ message: "User already exists" });
      }

      const userIdDoc = users.doc("userIdIndex");
      const userIdSnapshot = await userIdDoc.get();
      if (!userIdSnapshot.exists) {
        return res
          .status(500)
          .send({ message: "userIdIndex document does not exist" });
      }

      const userIdData = userIdSnapshot.data();
      const currentUserId = userIdData.userId;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = {
        email: email,
        password: hashedPassword,
        id: currentUserId,
        role: "admin",
      };

      const newDocument = await users
        .doc(currentUserId.toString())
        .set(newAdmin);
      await userIdDoc.update({ userId: currentUserId + 1 });

      res.status(201).send({
        message: "Admin registered successfully",
        newAdmin: newAdmin,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({ message: "Email and password are required" });
      }

      const userQuery = await users.where("email", "==", email).get();
      if (userQuery.empty) {
        return res.status(404).send({ message: "User does not exist" });
      }

      // get user data
      const userDoc = userQuery.docs[0];
      const user = userDoc.data();

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid password" });
      }

      const token = generateToken(user.id, user.role);
      res.status(200).send({ message: "Admin logged in succesfuly", token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getFavorites: async (req, res) => async (req, res) => {
    try {
      const userId = req.user.id;
      const userDoc = await users.doc(userId).get();
      const user = userDoc.data();

      const favoriteProducts = await Promise.all(
        user.favoriteProducts.map(async (productId) => {
          const productDoc = await products.doc(productId).get();
          return productDoc.data();
        })
      );

      res.send(favoriteProducts);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = controller;
