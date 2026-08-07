const Ticket = require("../models/Ticket");


// =================================
// OBTENER TODOS LOS TICKETS
// GET /tickets
// =================================

exports.obtenerTickets = async (req, res) => {

    try {


        const tickets = await Ticket.find()
            .sort({
                fechaCreacion:-1
            });


        res.json({

            success:true,

            tickets

        });



    } catch(error) {


        res.status(500).json({

            success:false,

            mensaje:error.message

        });


    }

};




// =================================
// OBTENER TICKET POR ID
// GET /tickets/:id
// =================================

exports.obtenerTicketPorId = async(req,res)=>{


    try{


        const ticket = await Ticket.findById(
            req.params.id
        );


        if(!ticket){

            return res.status(404).json({

                mensaje:"Ticket no encontrado"

            });

        }


        res.json({

            success:true,

            ticket

        });



    }catch(error){


        res.status(500).json({

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

            estado:req.body.estado || "Abierto"

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
// ACTUALIZAR TICKET
// PUT /tickets/:id
// =================================

exports.actualizarTicket = async(req,res)=>{


    try{


        const ticketActualizado =
        await Ticket.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        if(!ticketActualizado){


            return res.status(404).json({

                mensaje:"Ticket no encontrado"

            });


        }



        res.json({

            success:true,

            mensaje:"Ticket actualizado",

            ticket:ticketActualizado

        });



    }catch(error){


        res.status(500).json({

            mensaje:error.message

        });


    }


};




// =================================
// ELIMINAR TICKET
// DELETE /tickets/:id
// =================================

exports.eliminarTicket = async(req,res)=>{


    try{


        const ticket =
        await Ticket.findByIdAndDelete(
            req.params.id
        );



        if(!ticket){


            return res.status(404).json({

                mensaje:"Ticket no encontrado"

            });


        }



        res.json({

            success:true,

            mensaje:"Ticket eliminado correctamente"

        });



    }catch(error){


        res.status(500).json({

            mensaje:error.message

        });


    }


};




// =================================
// RESUMEN DASHBOARD
// GET /tickets/resumen
// =================================

exports.obtenerResumen = async(req,res)=>{


    try{


        const total =
        await Ticket.countDocuments();



        const abiertos =
        await Ticket.countDocuments({

            estado:"Abierto"

        });



        const enProceso =
        await Ticket.countDocuments({

            estado:"En Progreso"

        });



        const cerrados =
        await Ticket.countDocuments({

            estado:"Cerrado"

        });



        res.json({

            total,

            abiertos,

            enProceso,

            cerrados

        });



    }catch(error){


        res.status(500).json({

            mensaje:error.message

        });


    }


};