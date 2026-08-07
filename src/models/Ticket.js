const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [
        true,
        "El título del ticket es obligatorio"
      ],
      trim: true,
      minlength: [
        3,
        "El título debe tener al menos 3 caracteres"
      ],
      maxlength: [
        120,
        "El título no puede superar los 120 caracteres"
      ]
    },

    descripcion: {
      type: String,
      required: [
        true,
        "La descripción del ticket es obligatoria"
      ],
      trim: true,
      minlength: [
        5,
        "La descripción debe tener al menos 5 caracteres"
      ],
      maxlength: [
        2000,
        "La descripción no puede superar los 2000 caracteres"
      ]
    },

    categoria: {
      type: String,
      required: true,
      enum: [
        "Hardware",
        "Software",
        "Red",
        "Accesos",
        "Impresoras",
        "Otro"
      ],
      default: "Otro"
    },

    prioridad: {
      type: String,
      required: true,
      enum: [
        "Baja",
        "Media",
        "Alta",
        "Crítica"
      ],
      default: "Media"
    },

    estado: {
      type: String,
      required: true,
      enum: [
        "Abierto",
        "En proceso",
        "Cerrado"
      ],
      default: "Abierto"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/*
  Convierte automáticamente _id en id cuando
  MongoDB envía la información al frontend.
*/
ticketSchema.set("toJSON", {
  transform: function (documento, objetoRetornado) {
    objetoRetornado.id =
      objetoRetornado._id.toString();

    delete objetoRetornado._id;

    return objetoRetornado;
  }
});

const Ticket = mongoose.model(
  "Ticket",
  ticketSchema
);

module.exports = Ticket;