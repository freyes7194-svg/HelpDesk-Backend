const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema(

{

titulo:{

type:String,

required:true,

trim:true

},



descripcion:{

type:String,

required:true,

trim:true

},



categoria:{

type:String,

required:true

},



prioridad:{

type:String,

required:true

},



estado:{

type:String,

default:"Abierto"

},



// Control de modificaciones

editado:{

type:Boolean,

default:false

},



// Control de eliminación lógica

eliminado:{

type:Boolean,

default:false

},



fechaCreacion:{

type:Date,

default:Date.now

}


},


{

collection:"tickets"

}


);



module.exports = mongoose.model(

"Ticket",

ticketSchema

);