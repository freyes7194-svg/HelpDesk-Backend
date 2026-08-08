const mongoose = require("mongoose");


const TicketSchema = new mongoose.Schema(

{
    titulo: {
        type: String,
        required: true,
        trim: true
    },


    descripcion: {
        type: String,
        required: true,
        trim: true
    },


    categoria: {

        type: String,

        enum: [
            "Red",
            "Hardware",
            "Software"
        ],

        required: true

    },


    prioridad: {

        type: String,

        enum: [
            "Alta",
            "Media",
            "Baja"
        ],

        default: "Media"

    },


    estado: {

        type: String,

        enum: [
            "Abierto",
            "En Proceso",
            "Cerrado"
        ],

        default: "Abierto"

    },


    usuario: {

        type: String,

        default: "Usuario final"

    },


    tecnico: {

        type: String,

        default: null

    },


    fechaCreacion: {

        type: Date,

        default: Date.now

    }

},


{

    timestamps: true

}


);


module.exports = mongoose.model(
    "Ticket",
    TicketSchema
);