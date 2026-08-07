const express = require("express");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

/*
  Orígenes permitidos:
  - Frontend local durante el desarrollo.
  - Frontend público almacenado en FRONTEND_URL.
*/
const origenesPermitidos = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      /*
        Permite Postman, Chrome directo y los
        frontend incluidos en la lista.
      */
      if (
        !origin ||
        origenesPermitidos.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(
        new Error(
          `Origen no autorizado por CORS: ${origin}`
        )
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

app.use(
  express.json({
    limit: "1mb"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);

/*
  Ruta principal.
*/
app.get("/", (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje:
      "API pública del Sistema Help Desk funcionando correctamente",

    endpoints: {
      tickets: "/tickets",
      resumen: "/tickets/resumen",
      salud: "/health"
    }
  });
});

/*
  Ruta para comprobar el estado del servidor.
*/
app.get("/health", (req, res) => {
  res.status(200).json({
    exito: true,
    estado: "healthy"
  });
});

/*
  Rutas CRUD.
*/
app.use("/tickets", ticketRoutes);

/*
  Ruta no encontrada.
*/
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: "Ruta no encontrada",
    metodo: req.method,
    ruta: req.originalUrl
  });
});

/*
  Manejador general de errores.
*/
app.use((error, req, res, next) => {
  console.error(error.message);

  if (
    error.message.includes(
      "Origen no autorizado"
    )
  ) {
    return res.status(403).json({
      exito: false,
      mensaje: error.message
    });
  }

  return res.status(500).json({
    exito: false,
    mensaje:
      error.message ||
      "Error interno del servidor"
  });
});

module.exports = app;