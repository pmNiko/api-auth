import express from "express";
// modulo para el log de peticiones
import morgan from "morgan";
import pkg from "../package.json";

// creación de la instancia del server de express
const app = express();

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

export default app;
