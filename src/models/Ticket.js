const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema(
{

    titulo:{
        type:String,
        required:true
    },


    descripcion:{
        type:String,
        required:true
    },


    categoria:{
        type:String,
        required:true,
        enum:[
            "Red",
            "Hardware",
            "Software"
        ]
    },


    prioridad:{
        type:String,
        required:true,
        enum:[
            "Alta",
            "Media",
            "Baja"
        ]
    },


    estado:{
        type:String,
        required:true,
        enum:[
            "Abierto",
            "En Progreso",
            "Cerrado"
        ],
        default:"Abierto"
    },


    fechaCreacion:{
        type:Date,
        default:Date.now
    }


},
{
    timestamps:true
}
);



module.exports = mongoose.model(
    "Ticket",
    ticketSchema
);