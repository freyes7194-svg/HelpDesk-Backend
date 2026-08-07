const express = require("express");
const cors = require("cors");

require("dotenv").config();


const conectarDB = require("./config/database");


const ticketRoutes = require("./routes/ticketRoutes");


// Crear aplicación Express

const app = express();


// Conectar MongoDB Atlas

conectarDB();



// ===============================
// MIDDLEWARES
// ===============================


// Permitir conexión con React

app.use(
    cors({

        origin:[
            process.env.FRONTEND_URL,
            "http://localhost:5173"
        ],

        methods:[
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],

        credentials:true

    })
);



// Permitir JSON

app.use(
    express.json()
);




// ===============================
// RUTA DE PRUEBA
// ===============================

app.get("/",(req,res)=>{


    res.json({

        mensaje:
        "API Help Desk funcionando correctamente"

    });


});




// ===============================
// RUTAS DEL SISTEMA
// ===============================


app.use(
    "/tickets",
    ticketRoutes
);



module.exports = app;