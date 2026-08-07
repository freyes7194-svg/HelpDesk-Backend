const Ticket = require("../models/Ticket");

const CAMPOS_PERMITIDOS = [
  "titulo",
  "descripcion",
  "categoria",
  "prioridad",
  "estado"
];

/*
  Evita que el usuario modifique campos
  internos de MongoDB.
*/
const limpiarDatosTicket = (body = {}) => {
  const datosLimpios = {};

  CAMPOS_PERMITIDOS.forEach((campo) => {
    if (body[campo] !== undefined) {
      datosLimpios[campo] =
        typeof body[campo] === "string"
          ? body[campo].trim()
          : body[campo];
    }
  });

  return datosLimpios;
};

/*
  Función general para controlar errores
  enviados por MongoDB o Mongoose.
*/
const responderError = (
  res,
  error,
  mensajeGeneral
) => {
  if (error.name === "ValidationError") {
    const errores = Object.values(
      error.errors
    ).map((item) => item.message);

    return res.status(400).json({
      exito: false,
      mensaje: "Existen datos inválidos",
      errores
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      exito: false,
      mensaje:
        "El identificador del ticket no es válido"
    });
  }

  console.error(error);

  return res.status(500).json({
    exito: false,
    mensaje: mensajeGeneral,
    error: error.message
  });
};

/*
  GET http://localhost:5055/tickets

  Obtiene todos los tickets ordenados
  desde el más reciente.
*/
const obtenerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({
      createdAt: -1
    });

    return res.status(200).json({
      exito: true,
      cantidad: tickets.length,
      tickets
    });
  } catch (error) {
    return responderError(
      res,
      error,
      "Error al obtener los tickets"
    );
  }
};

/*
  GET http://localhost:5055/tickets/resumen

  Devuelve los contadores del dashboard.
*/
const obtenerResumenTickets = async (
  req,
  res
) => {
  try {
    const [
      total,
      abiertos,
      enProceso,
      cerrados,
      prioridadAlta,
      criticos
    ] = await Promise.all([
      Ticket.countDocuments(),

      Ticket.countDocuments({
        estado: "Abierto"
      }),

      Ticket.countDocuments({
        estado: "En proceso"
      }),

      Ticket.countDocuments({
        estado: "Cerrado"
      }),

      Ticket.countDocuments({
        prioridad: "Alta"
      }),

      Ticket.countDocuments({
        prioridad: "Crítica"
      })
    ]);

    return res.status(200).json({
      exito: true,
      resumen: {
        total,
        abiertos,
        enProceso,
        cerrados,
        prioridadAlta,
        criticos
      }
    });
  } catch (error) {
    return responderError(
      res,
      error,
      "Error al obtener los contadores"
    );
  }
};

/*
  GET http://localhost:5055/tickets/:id

  Busca un ticket específico por su ID.
*/
const obtenerTicketPorId = async (
  req,
  res
) => {
  try {
    const ticket = await Ticket.findById(
      req.params.id
    );

    if (!ticket) {
      return res.status(404).json({
        exito: false,
        mensaje: "Ticket no encontrado"
      });
    }

    return res.status(200).json({
      exito: true,
      ticket
    });
  } catch (error) {
    return responderError(
      res,
      error,
      "Error al buscar el ticket"
    );
  }
};

/*
  POST http://localhost:5055/tickets

  Registra un nuevo ticket.
*/
const crearTicket = async (req, res) => {
  try {
    const datosTicket =
      limpiarDatosTicket(req.body);

    const nuevoTicket = new Ticket({
      titulo: datosTicket.titulo,
      descripcion: datosTicket.descripcion,
      categoria:
        datosTicket.categoria || "Otro",
      prioridad:
        datosTicket.prioridad || "Media",
      estado:
        datosTicket.estado || "Abierto"
    });

    const ticketGuardado =
      await nuevoTicket.save();

    return res.status(201).json({
      exito: true,
      mensaje:
        "Ticket creado correctamente",
      ticket: ticketGuardado
    });
  } catch (error) {
    return responderError(
      res,
      error,
      "Error al crear el ticket"
    );
  }
};

/*
  PUT http://localhost:5055/tickets/:id

  Edita un ticket existente.
*/
const actualizarTicket = async (
  req,
  res
) => {
  try {
    const datosActualizados =
      limpiarDatosTicket(req.body);

    if (
      Object.keys(datosActualizados).length === 0
    ) {
      return res.status(400).json({
        exito: false,
        mensaje:
          "No se enviaron datos válidos para actualizar"
      });
    }

    const ticketActualizado =
      await Ticket.findByIdAndUpdate(
        req.params.id,
        datosActualizados,
        {
          new: true,
          runValidators: true
        }
      );

    if (!ticketActualizado) {
      return res.status(404).json({
        exito: false,
        mensaje: "Ticket no encontrado"
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje:
        "Ticket actualizado correctamente",
      ticket: ticketActualizado
    });
  } catch (error) {
    return responderError(
      res,
      error,
      "Error al actualizar el ticket"
    );
  }
};

/*
  DELETE http://localhost:5055/tickets/:id

  Elimina definitivamente el ticket
  de MongoDB Atlas.
*/
const eliminarTicket = async (req, res) => {
  try {
    const ticketEliminado =
      await Ticket.findByIdAndDelete(
        req.params.id
      );

    if (!ticketEliminado) {
      return res.status(404).json({
        exito: false,
        mensaje: "Ticket no encontrado"
      });
    }

    return res.status(200).json({
      exito: true,
      mensaje:
        "Ticket eliminado correctamente",
      ticketEliminado
    });
  } catch (error) {
    return responderError(
      res,
      error,
      "Error al eliminar el ticket"
    );
  }
};

module.exports = {
  obtenerTickets,
  obtenerResumenTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket
};