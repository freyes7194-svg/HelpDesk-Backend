const mongoose = require("mongoose");


const prioridadSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true,
        unique: true
    },

    descripcion: {
        type: String,
        default: ""
    },

    nivel: {
        type: Number,
        default: 1
    },

    activo: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});


const Prioridad = mongoose.model(
    "Prioridad",
    prioridadSchema
);


module.exports = Prioridad;