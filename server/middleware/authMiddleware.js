const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: "No Authorization Header",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid Authorization Format",
    });
  }

  const token = authHeader.substring(7);

  console.log("Token:", token);

 jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    console.log("JWT Error:", err);

    return res.status(403).json({
      message: "Token Expired or Invalid",
    });
  }

  console.log("Decoded Token:", decoded);

  req.user = decoded;
  next();
});
};

module.exports = verifyToken;