const jwt = require("jsonwebtoken");
const AppDataSource = require("../config/database");
const User = require("../entities/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await AppDataSource.manager.findOne(User, {
      where: { id: decoded.userId },
    });
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
