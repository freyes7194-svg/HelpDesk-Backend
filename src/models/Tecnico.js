const mongoose = require("mongoose");


const tecnicoSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: true
    },

    especialidad: {
        type: String,
        required: true
    },

    disponibilidad: {
        type: Boolean,
        default: true
    },

    correo: {
        type: String,
        default: ""
    },

    telefono: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});


const Tecnico = mongoose.model("Tecnico", tecnicoSchema);


module.exports = Tecnico;