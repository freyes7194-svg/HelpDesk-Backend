const express = require("express");

const {
  obtenerTickets,
  obtenerResumenTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket
} = require(
  "../controllers/ticketController"
);

const router = express.Router();

/*
  La ruta /resumen debe estar antes de /:id.
  De lo contrario Express podría interpretar
  "resumen" como el ID de un ticket.
*/
router.get(
  "/resumen",
  obtenerResumenTickets
);

router.get(
  "/",
  obtenerTickets
);

router.get(
  "/:id",
  obtenerTicketPorId
);

router.post(
  "/",
  crearTicket
);

router.put(
  "/:id",
  actualizarTicket
);

router.delete(
  "/:id",
  eliminarTicket
);

module.exports = router;