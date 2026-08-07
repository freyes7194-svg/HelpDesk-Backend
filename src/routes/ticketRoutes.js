const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketController");



// ============================
// RESUMEN DASHBOARD
// IMPORTANTE PRIMERO
// ============================

router.get(
    "/resumen",
    ticketController.obtenerResumen
);



// ============================
// LISTAR TICKETS
// ============================

router.get(
    "/",
    ticketController.obtenerTickets
);



// ============================
// CREAR TICKET
// ============================

router.post(
    "/",
    ticketController.crearTicket
);



// ============================
// OBTENER POR ID
// ============================

router.get(
    "/:id",
    ticketController.obtenerTicketPorId
);



// ============================
// ACTUALIZAR
// ============================

router.put(
    "/:id",
    ticketController.actualizarTicket
);



// ============================
// ELIMINAR
// ============================

router.delete(
    "/:id",
    ticketController.eliminarTicket
);



module.exports = router;