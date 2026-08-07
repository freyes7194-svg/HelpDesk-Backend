const mongoose = require("mongoose");


const categoriaSchema = new mongoose.Schema(
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

    estado: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});


const Categoria = mongoose.model("Categoria", categoriaSchema);


module.exports = Categoria;