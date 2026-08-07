const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketController");


// ===============================
// RESUMEN DASHBOARD
// IMPORTANTE: DEBE IR ANTES DE /:id
// ===============================

router.get(
    "/resumen",
    ticketController.obtenerResumen
);



// ===============================
// OBTENER TODOS
// ===============================

router.get(
    "/",
    ticketController.obtenerTickets
);



// ===============================
// CREAR
// ===============================

router.post(
    "/",
    ticketController.crearTicket
);



// ===============================
// OBTENER POR ID
// ===============================

router.get(
    "/:id",
    ticketController.obtenerTicketPorId
);



// ===============================
// ACTUALIZAR
// ===============================

router.put(
    "/:id",
    ticketController.actualizarTicket
);



// ===============================
// ELIMINAR
// ===============================

router.delete(
    "/:id",
    ticketController.eliminarTicket
);



module.exports = router;