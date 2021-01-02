// este es el modulo que validara el token
import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUser = async (req, res, next) => {
  const username = await User.findOne({ username: req.body.username });

  if (username) {
    return res.status(400).json({ message: "User already exists" });
  }

  const email = await User.findOne({ email: req.body.email });

  if (email) {
    return res.status(400).json({ message: "Email already exists" });
  }

  next();
};

export const checkRolesExisted = (req, res, next) => {
  let roles = req.body.roles;
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return res.status(400).json({
          message: ` Role ${roles[i]} does not exists`,
        });
      }
    }
  }
  next();
};
