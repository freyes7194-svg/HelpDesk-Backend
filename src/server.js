const app = require("./app");

const conectarDB = require("./config/database");

require("dotenv").config();


// =====================================
// PUERTO DEL SERVIDOR
// =====================================

const PORT = process.env.PORT || 5055;



// =====================================
// INICIAR SERVIDOR
// =====================================

const iniciarServidor = async () => {

    try {


        // Primero conecta MongoDB Atlas

        await conectarDB();



        // Después levanta Express

        app.listen(
            PORT,
            "0.0.0.0",
            () => {

                console.log(
                    `🚀 Servidor Help Desk ejecutándose en puerto ${PORT}`
                );


                console.log(
                    `📱 Acceso móvil habilitado`
                );


            }
        );


    } catch (error) {


        console.error(
            "❌ Error iniciando servidor:",
            error.message
        );


        process.exit(1);


    }

};



iniciarServidor();