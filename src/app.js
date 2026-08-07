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
// CORS
// ===============================

app.use(
    cors({
        origin:[
            "https://helpdesk-frontend-react.onrender.com",
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



// ===============================
// JSON
// ===============================

app.use(
    express.json()
);



// ===============================
// RUTA PRUEBA
// ===============================

app.get("/",(req,res)=>{

    res.json({

        mensaje:
        "API Help Desk funcionando correctamente"

    });

});



// ===============================
// RUTAS TICKETS
// ===============================

app.use(
    "/tickets",
    ticketRoutes
);



module.exports = app;