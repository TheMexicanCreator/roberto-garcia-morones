const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Acceso denegado, token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, token });

    if (!user) return res.status(401).json({ error: "Token inválido" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token no válido o expirado" });
  }
};

module.exports = authMiddleware;
