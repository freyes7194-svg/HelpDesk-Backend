const conectarDB = require("./config/database");


async function probarConexion(){

    try{

        await conectarDB();

        console.log("✅ Conexión a MongoDB Atlas exitosa");

        process.exit(0);


    }catch(error){

        console.error("❌ Error de conexión:", error.message);

        process.exit(1);

    }

}


probarConexion();