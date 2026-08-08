const mongoose = require("mongoose");
require("dotenv").config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Atlas conectado correctamente");

  } catch (error) {

    console.error(
      "❌ Error al conectar MongoDB Atlas:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = conectarDB;