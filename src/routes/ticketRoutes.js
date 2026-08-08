const express = require("express");

const router = express.Router();

const {
    obtenerTickets,
    obtenerTicketPorId,
    crearTicket,
    actualizarTicket,
    eliminarTicket,
    obtenerResumen
} = require("../controllers/ticketController");


// =====================================
// DASHBOARD
// IMPORTANTE:
// debe ir antes de /:id
// para evitar que "resumen" sea tratado
// como un ID de MongoDB
// =====================================

router.get(
    "/resumen",
    obtenerResumen
);


// =====================================
// CRUD TICKETS
// =====================================


// Obtener todos
router.get(
    "/",
    obtenerTickets
);


// Obtener por ID
router.get(
    "/:id",
    obtenerTicketPorId
);


// Crear nuevo
router.post(
    "/",
    crearTicket
);


// Actualizar
router.put(
    "/:id",
    actualizarTicket
);


// Eliminar
router.delete(
    "/:id",
    eliminarTicket
);


module.exports = router;