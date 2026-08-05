const sequelize = require("./config/database");

async function probarConexion(){

    try {

        await sequelize.authenticate();

        console.log("✅ Conexión a SQLite exitosa");

    } catch(error){

        console.error("❌ Error de conexión:", error.message);

    }

}

probarConexion();