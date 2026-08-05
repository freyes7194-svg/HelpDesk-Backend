const sequelize = require("./config/database");

require("./models");

async function probarModelos(){

    try{

        await sequelize.sync();

        console.log("✅ Modelos sincronizados correctamente");

    }catch(error){

        console.error(error);

    }

}

probarModelos();