const mongoose = require("mongoose");


const estadoSchema = new mongoose.Schema(
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

    activo: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});


const Estado = mongoose.model("Estado", estadoSchema);


module.exports = Estado;