const mongoose = require("./config/database");

require("./models");


async function probarModelos(){

    try{

        await mongoose();

        console.log("✅ Modelos cargados correctamente en MongoDB");


        process.exit();


    }catch(error){

        console.error("❌ Error cargando modelos:", error.message);

        process.exit(1);

    }

}


probarModelos();