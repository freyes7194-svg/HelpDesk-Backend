const mongoose = require("mongoose");


const historialTicketSchema = new mongoose.Schema(
{
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },

    accion: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        default: ""
    },

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },

    estadoAnterior: {
        type: String,
        default: ""
    },

    estadoNuevo: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});


const HistorialTicket = mongoose.model(
    "HistorialTicket",
    historialTicketSchema
);


module.exports = HistorialTicket;