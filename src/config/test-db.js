const mongoose = require("mongoose");
require("dotenv").config();


async function probarConexion() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ Conexión a MongoDB Atlas exitosa");

        process.exit();

    } catch(error) {

        console.error("❌ Error de conexión MongoDB:", error.message);

        process.exit(1);

    }

}


probarConexion();