const db = require("../config/db");
const users = db.collection("users");
const products = db.collection("products");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");
const { setLogFunction } = require("firebase-admin/firestore");
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
        cart: [],
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
      const { email, password, adminPass } = req.body;
      if (!email || !password || !adminPass) {
        return res
          .status(400)
          .send({ message: "Email, password and admin password are required" });
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

      if (adminPass !== process.env.ADMIN_PASS) {
        return res.status(401).send({ message: "Invalid admin password" });
      }

      const token = generateToken(user.id, user.role);
      res.status(200).send({ message: "Admin logged in succesfuly", token });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getFavorites: async (req, res) => {
    try {
      const userId = req.user.userId;
      const userDoc = await users.doc(userId.toString()).get();

      if (!userDoc.exists) {
        return res.status(404).send({ message: "User not found" });
      }

      const user = userDoc.data();
      const favoriteProducts = user.favoriteProducts;

      console.log("favorite products" + favoriteProducts);
      res.send(favoriteProducts);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  toggleFavorite: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ message: "Missing userId or productId" });
      }

      const userRef = db.collection("users").doc(userId.toString());
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = userDoc.data();
      const favoriteProducts = new Set(user.favoriteProducts || []);

      let isFavorite;
      if (favoriteProducts.has(productId)) {
        favoriteProducts.delete(productId);
        isFavorite = false;
      } else {
        favoriteProducts.add(productId);
        isFavorite = true;
      }

      await userRef.update({ favoriteProducts: Array.from(favoriteProducts) });

      res.status(200).json({
        favoriteProducts: Array.from(favoriteProducts),
        isFavorite: isFavorite,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      res.status(500).json({ message: error.message });
    }
  },
  getFavoriteStatus: async (req, res) => {
    try {
      const { userId } = req.user;
      const { productId } = req.params;

      const userDoc = await users.doc(userId.toString()).get();
      if (!userDoc.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      const userData = userDoc.data();
      let isFavorite = false;
      for (let idIndex of userData.favoriteProducts) {
        if (idIndex == productId) {
          isFavorite = true;
          break;
        }
      }

      res.status(200).json({ isFavorite: isFavorite });
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  },
  getCart: async (req, res) => {
    console.log("Intram pe ruta get? ");
    try {
      const userId = req.user.userId;
      console.log("userId: " + userId);

      const userDoc = await users.doc(userId.toString()).get();
      if (!userDoc.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      const userData = userDoc.data();
      const cart = userData.cart || [];
      const cartQuantity = userData.cartQuantity || [];
      console.log("cartQuantity: " + cartQuantity);
      console.log("cart: " + cart);

      res.status(200).json({ cart, cartQuantity });
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  },

  updateCart: async (req, res) => {
    try {
      console.log("Am intrat pe ruta 22.00");
      const userId = req.user.userId;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Missing user ID" });
      }

      const { productId, quantity } = req.body;
      if (!productId || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid product ID or quantity" });
      }

      const userRef = users.doc(userId.toString());
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      let userData = userDoc.data();
      let cart = userData.cart || [];
      let cartQuantity = userData.cartQuantity || [];

      const productIndex = cart.indexOf(productId.toString());

      if (productIndex !== -1) {
        cartQuantity[productIndex] = quantity;
      } else {
        cart.push(productId);
        cartQuantity.push(quantity);
      }

      await userRef.update({ cart, cartQuantity });

      res
        .status(200)
        .json({ message: "Cart updated successfully", cart, cartQuantity });
    } catch (error) {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { productId } = req.body;

      const userRef = users.doc(userId.toString());
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      let cart = userDoc.data().cart || [];
      let cartQuantity = userDoc.data().cartQuantity || [];
      let index;

      for (let i of cart) {
        if (cart[i] == productId) {
          index = i;
          break;
        }
      }
      console.log("index:" + index);
      if (index === -1) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      cart.splice(index, 1);
      cartQuantity.splice(index, 1);

      await userRef.update({ cart, cartQuantity });

      res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      console.error("Error removing product:", error);
      res.status(500).json({ message: "Server error: " + error.message });
    }
  },
};

module.exports = controller;
