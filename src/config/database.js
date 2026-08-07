const mongoose = require("mongoose");

const conectarBaseDatos = async () => {
  const uri = process.env.MONGODB_URI;

  /*
    Validación adicional para impedir que
    Mongoose reciba undefined.
  */
  if (
    !uri ||
    typeof uri !== "string" ||
    uri.trim() === ""
  ) {
    throw new Error(
      "La variable MONGODB_URI no está definida. Revisa el archivo backend/.env."
    );
  }

  /*
    Comprobamos que parezca una conexión MongoDB.
  */
  if (
    !uri.startsWith("mongodb://") &&
    !uri.startsWith("mongodb+srv://")
  ) {
    throw new Error(
      "MONGODB_URI no tiene un formato válido. Debe comenzar con mongodb:// o mongodb+srv://"
    );
  }

  try {
    const conexion = await mongoose.connect(
      uri.trim()
    );

    console.log(
      "MongoDB Atlas conectado correctamente"
    );

    console.log(
      `Base de datos: ${conexion.connection.name}`
    );

    console.log(
      `Servidor MongoDB: ${conexion.connection.host}`
    );

    return conexion;
  } catch (error) {
    console.error(
      "Error al conectar con MongoDB Atlas:"
    );

    /*
      No imprimimos la URI porque contiene
      usuario y contraseña.
    */
    console.error(error.message);

    throw error;
  }
};

module.exports = conectarBaseDatos;