const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();


// Middlewares

app.use(cors());

app.use(express.json());


// Ruta principal

app.get("/", (req,res)=>{

    res.json({
        mensaje:"API Help Desk funcionando correctamente"
    });

});


// Rutas del sistema

app.use("/tickets", ticketRoutes);


module.exports = app;