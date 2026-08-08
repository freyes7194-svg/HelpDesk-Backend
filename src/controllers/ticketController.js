const Ticket = require("../models/Ticket");


// =================================
// OBTENER TODOS LOS TICKETS
// GET /tickets
// =================================

exports.obtenerTickets = async (req,res)=>{

try{


    const tickets = await Ticket.find({

        eliminado:false

    })
    .sort({

        fechaCreacion:-1

    });



    res.json({

        success:true,

        tickets

    });



}catch(error){


    res.status(500).json({

        success:false,

        mensaje:error.message

    });


}


};




// =================================
// OBTENER RESUMEN DASHBOARD
// GET /tickets/resumen
// =================================

exports.obtenerResumen = async(req,res)=>{

try{


    const total = await Ticket.countDocuments({
        eliminado:false
    });



    const abiertos = await Ticket.countDocuments({
        estado:"Abierto",
        eliminado:false
    });



    const enProceso = await Ticket.countDocuments({
        estado:"En Proceso",
        eliminado:false
    });



    const cerrados = await Ticket.countDocuments({
        estado:"Cerrado",
        eliminado:false
    });



    const editados = await Ticket.countDocuments({
        editado:true
    });



    const eliminados = await Ticket.countDocuments({
        eliminado:true
    });



    res.json({

        success:true,

        total,

        abiertos,

        enProceso,

        cerrados,

        editados,

        eliminados

    });



}catch(error){


    res.status(500).json({

        success:false,

        mensaje:error.message

    });


}

};



// =================================
// CREAR TICKET
// POST /tickets
// =================================

exports.crearTicket = async(req,res)=>{

try{


    const nuevoTicket = await Ticket.create({

        titulo:req.body.titulo,

        descripcion:req.body.descripcion,

        categoria:req.body.categoria,

        prioridad:req.body.prioridad,

        estado:req.body.estado || "Abierto",

        editado:false,

        eliminado:false

    });



    res.status(201).json({

        success:true,

        mensaje:"Ticket creado correctamente",

        ticket:nuevoTicket

    });



}catch(error){


    res.status(500).json({

        success:false,

        mensaje:error.message

    });


}


};




// =================================
// OBTENER TICKET POR ID
// =================================

exports.obtenerTicketPorId = async(req,res)=>{

try{


    const ticket = await Ticket.findById(

        req.params.id

    );



    if(!ticket){

        return res.status(404).json({

            success:false,

            mensaje:"Ticket no encontrado"

        });

    }



    res.json({

        success:true,

        ticket

    });



}catch(error){


    res.status(500).json({

        success:false,

        mensaje:error.message

    });


}


};




// =================================
// ACTUALIZAR TICKET
// =================================

exports.actualizarTicket = async(req,res)=>{

try{


    const ticket = await Ticket.findByIdAndUpdate(

        req.params.id,


        {

            ...req.body,

            editado:true

        },


        {

            new:true

        }


    );



    if(!ticket){


        return res.status(404).json({

            success:false,

            mensaje:"Ticket no encontrado"

        });


    }



    res.json({

        success:true,

        mensaje:"Ticket actualizado correctamente",

        ticket

    });



}catch(error){


    res.status(500).json({

        success:false,

        mensaje:error.message

    });


}


};




// =================================
// ELIMINAR TICKET
// =================================

exports.eliminarTicket = async(req,res)=>{

try{


    const ticket = await Ticket.findByIdAndUpdate(

        req.params.id,


        {

            eliminado:true

        },


        {

            new:true

        }


    );



    if(!ticket){


        return res.status(404).json({

            success:false,

            mensaje:"Ticket no encontrado"

        });


    }



    res.json({

        success:true,

        mensaje:"Ticket eliminado correctamente"

    });



}catch(error){


    res.status(500).json({

        success:false,

        mensaje:error.message

    });


}


};