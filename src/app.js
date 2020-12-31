import express from "express";
// modulo para el log de peticiones
import morgan from "morgan";
import pkg from "../package.json";
// rutas de products
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";

// importo el initialSetup
import { createRoles } from "./libs/initialSetup";

// creación de la instancia del server de express
const app = express();
// creo los roles
createRoles();

// le indicamos a express que reciba los datos en formato json
app.use(express.json());

// indicamos a morgan el nivel de ejecucion
app.use(morgan("dev"));

// seteamos un par clave valor en express
app.set("pkg", pkg);

app.get("/", (req, res) => {
  // destruct de las props que nos interesan
  let { name, author, description, version } = app.get("pkg");
  res.json({
    name,
    author,
    description,
    version,
  });
});

// hacemos uso de las routes de products
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);

export default app;
