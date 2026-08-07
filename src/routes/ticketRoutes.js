const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketController");


// IMPORTANTE PRIMERO
router.get(
    "/resumen",
    ticketController.obtenerResumen
);


router.get(
    "/",
    ticketController.obtenerTickets
);


router.post(
    "/",
    ticketController.crearTicket
);


router.get(
    "/:id",
    ticketController.obtenerTicketPorId
);


router.put(
    "/:id",
    ticketController.actualizarTicket
);


router.delete(
    "/:id",
    ticketController.eliminarTicket
);


module.exports = router;