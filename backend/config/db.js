const config = require("./config");
const jsonConfig = require("../utils/serviceAccountKey.json");

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

initializeApp({
  credential: cert(jsonConfig),
});

const db = getFirestore();

module.exports = db;
