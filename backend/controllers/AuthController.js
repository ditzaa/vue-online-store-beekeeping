const jwt = require("jsonwebtoken");
const db = require("../config/db");
const users = db.collection("users");

const validateToken = async (req, res) => {
  // try {
  //   const token = req.headers.authorization?.split(" ")[1];

  //   if (!token) {
  //     return res.status(401).json({ message: "No token provided" });
  //   }

  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   const userQuery = await users.doc(decoded.id).get();
  //   if (!userQuery.exists) {
  //     return res.status(404).json({ message: "User not found" });
  //   }

  //   const user = userQuery.data();
  //   return res.status(200).json({
  //     user: { id: userQuery.id, email: user.email, role: user.role },
  //   });
  // } catch (error) {
  //   return res.status(401).json({ message: "Invalid or expired token" });
  // }

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user from token:", decoded); // DEBUG

    // Caută user-ul în Firestore după ID
    const userRef = db.collection("users").doc(decoded.id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userDoc.data();
    res.json({
      user: {
        id: decoded.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Token validation error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { validateToken };
