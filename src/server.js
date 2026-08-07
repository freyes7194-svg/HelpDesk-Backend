require("dotenv").config();

const app = require("./app");
const conectarBaseDatos = require(
  "./config/database"
);

const PORT =
  Number(process.env.PORT) || 5055;

const iniciarServidor = async () => {
  try {
    await conectarBaseDatos();

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          "===================================="
        );

        console.log(
          "API Help Desk iniciada correctamente"
        );

        console.log(
          `Servidor ejecutándose en el puerto ${PORT}`
        );

        console.log(
          "===================================="
        );
      }
    );
  } catch (error) {
    console.error(
      "No se pudo iniciar el servidor:",
      error.message
    );

    process.exit(1);
  }
};

iniciarServidor();