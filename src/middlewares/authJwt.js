// este modulo de verifica que exista el token
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

// middle de verificación de token
export const verifyToken = async (req, res, next) => {
  try {
    // comprobación de existencia del token
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provider" });

    // recuperamos la información del token
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// middle de validación de moderator
export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Required moderator role" });
};

// middle de validación de admin
export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Required admin role" });
};
