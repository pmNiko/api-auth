import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

//----------  función de creación de user  --------//
export const singup = async (req, res) => {
  // recupero los params enviados por el user
  let { username, email, password, roles } = req.body;
  // creo una instancia de User
  let user = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  // si llegan roles como params
  if (roles) {
    // busco esos roles
    let foundRoles = await Role.find({ name: { $in: roles } });
    // se le asigna al array de roles del user
    user.roles = foundRoles.map((role) => role._id);
  } else {
    // de lo contrario se le asigna el rol de user normal
    let role = await Role.findOne({ name: "user" });
    user.roles = [role._id];
  }

  let savedUser = await user.save();

  let token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
};

//--------- función de login de user  -----------//
export const singin = async (req, res) => {
  // recupero el user que intenta loguearse
  let userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  console.log(userFound);

  // compruebo que el usuario exista
  if (!userFound) return res.status(400).json({ message: "User not found" });

  // si matchea compruebo que la clave sea la correcta
  let match = await User.comparePassword(req.body.password, userFound.password);

  // si el match es false le devolvemos el mensaje de error al usuario
  if (!match)
    return res.status(401).json({ token: null, message: "invalid password " });

  // por el contrario si coincide le devuelvo un token
  let token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};
