import Role from "../models/Role";

export const createRoles = async () => {
  try {
    // este metodo devuelve la cantidad de documentos creados
    const count = await Role.estimatedDocumentCount();

    // si existen corta la ejecución
    if (count > 0) return;

    // de lo contrario creamos una fn que ejecuta las siguientes fn al mismo tiempo
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
