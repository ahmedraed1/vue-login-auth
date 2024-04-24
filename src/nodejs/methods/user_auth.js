const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSign = function (data, secretKey, expiresTime) {
  try {
    const token = jwt.sign(data, secretKey, {
      expiresIn: expiresTime,
    });
    return {
      message: "operation successfully...",
      secret: token,
      login: true,
    };
  } catch {
    return "ERROR!";
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Authorization failed. No access token.");
  }
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Could not verify token");
    }
    req.user = user;
  });
  next();
};

module.exports = { jwtSign, authenticateToken };
