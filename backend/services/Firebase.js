import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const serviceAccount = require("../utils/serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
export { db };
