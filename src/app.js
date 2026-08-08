const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();


// ===============================
// CONFIGURACIÓN CORS
// ===============================

const opcionesCors = {
  origin: function (origin, callback) {

    const origenesPermitidos = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://helpdesk-frontend.onrender.com"
    ];


    // Permite Postman, aplicaciones móviles y pruebas sin origen
    if (!origin) {
      return callback(null, true);
    }


    if (origenesPermitidos.includes(origin)) {
      return callback(null, true);
    }


    return callback(null, true);
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ]
};


app.use(cors(opcionesCors));


// ===============================
// MIDDLEWARE JSON
// ===============================

app.use(express.json());


// ===============================
// RUTA PRINCIPAL
// ===============================

app.get("/", (req, res) => {

  res.json({
    mensaje:
      "API Sistema de Gestión de Incidentes Help Desk funcionando correctamente",
    puerto:
      process.env.PORT || 5055
  });

});


// ===============================
// RUTAS DEL SISTEMA
// ===============================

app.use("/tickets", ticketRoutes);


// ===============================
// MANEJO DE ERROR 404
// ===============================

app.use((req, res) => {

  res.status(404).json({

    error: "Ruta no encontrada",

    ruta:
      req.originalUrl

  });

});


module.exports = app;