const { Ticket, Categoria, Prioridad, Estado, Usuario, Tecnico } = require("../models");


// GET /tickets
exports.obtenerTickets = async (req, res) => {

    try {

        const tickets = await Ticket.findAll({
            include:[
                Categoria,
                Prioridad,
                Estado,
                Usuario,
                Tecnico
            ]
        });

        res.json({
            success:true,
            data:tickets
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};



// GET /tickets/:id
exports.obtenerTicketPorId = async(req,res)=>{

    try{

        const ticket = await Ticket.findByPk(req.params.id,{
            include:[
                Categoria,
                Prioridad,
                Estado,
                Usuario,
                Tecnico
            ]
        });


        if(!ticket){

            return res.status(404).json({
                success:false,
                message:"Ticket no encontrado"
            });

        }


        res.json({
            success:true,
            data:ticket
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};



// POST /tickets
exports.crearTicket = async(req,res)=>{

    try{

        const {
            titulo,
            descripcion,
            categoriaId,
            prioridadId,
            usuarioId,
            tecnicoId
        } = req.body;


        const ticket = await Ticket.create({

            numero:"TK-"+Date.now(),

            titulo,

            descripcion,

            CategoriaId:categoriaId,

            PrioridadId:prioridadId,

            EstadoId:1,

            UsuarioId:usuarioId,

            TecnicoId:tecnicoId || null

        });


        res.status(201).json({

            success:true,

            message:"Ticket creado exitosamente",

            data:ticket

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



// PUT /tickets/:id
exports.actualizarTicket = async(req,res)=>{

    try{


        const ticket = await Ticket.findByPk(req.params.id);


        if(!ticket){

            return res.status(404).json({

                success:false,

                message:"Ticket no encontrado"

            });

        }


        await ticket.update(req.body);


        res.json({

            success:true,

            message:"Ticket actualizado",

            data:ticket

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



// DELETE /tickets/:id
exports.eliminarTicket = async(req,res)=>{

    try{


        const ticket = await Ticket.findByPk(req.params.id);


        if(!ticket){

            return res.status(404).json({

                success:false,

                message:"Ticket no encontrado"

            });

        }


        await ticket.destroy();


        res.json({

            success:true,

            message:"Ticket eliminado correctamente"

        });



    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};