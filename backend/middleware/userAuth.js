const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "No token provided" });

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(500).json({ msg: err.message });

      req.user = decoded;

      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = userAuth;
