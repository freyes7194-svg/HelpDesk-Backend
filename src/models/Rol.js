const mongoose = require("mongoose");


const rolSchema = new mongoose.Schema(
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


const Rol = mongoose.model("Rol", rolSchema);


module.exports = Rol;