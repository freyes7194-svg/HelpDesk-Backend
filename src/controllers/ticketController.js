const Ticket = require("../models/Ticket");


// =====================================
// OBTENER TODOS LOS TICKETS
// GET /tickets
// =====================================

exports.obtenerTickets = async (req, res) => {

    try {

        const tickets = await Ticket.find()
            .sort({
                createdAt: -1
            });


        res.status(200).json(tickets);


    } catch (error) {

        res.status(500).json({

            mensaje: "Error al obtener tickets",

            error: error.message

        });

    }

};



// =====================================
// OBTENER TICKET POR ID
// GET /tickets/:id
// =====================================

exports.obtenerTicketPorId = async (req, res) => {

    try {

        const ticket = await Ticket.findById(
            req.params.id
        );


        if (!ticket) {

            return res.status(404).json({

                mensaje: "Ticket no encontrado"

            });

        }


        res.status(200).json(ticket);


    } catch (error) {

        res.status(500).json({

            mensaje: "Error al buscar ticket",

            error: error.message

        });

    }

};



// =====================================
// CREAR TICKET
// POST /tickets
// =====================================

exports.crearTicket = async (req, res) => {

    try {


        const nuevoTicket = new Ticket({

            titulo: req.body.titulo,

            descripcion: req.body.descripcion,

            categoria: req.body.categoria,

            prioridad: req.body.prioridad,

            estado:
                req.body.estado || "Abierto",

            usuario:
                req.body.usuario || "Usuario final"

        });



        const ticketGuardado =
            await nuevoTicket.save();



        res.status(201).json({

            mensaje:
                "Ticket creado correctamente",

            ticket:
                ticketGuardado

        });



    } catch (error) {


        res.status(400).json({

            mensaje:
                "Error al crear ticket",

            error:
                error.message

        });


    }

};



// =====================================
// ACTUALIZAR TICKET
// PUT /tickets/:id
// =====================================

exports.actualizarTicket = async (req, res) => {

    try {


        const ticketActualizado =
            await Ticket.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true,
                    runValidators: true
                }

            );



        if (!ticketActualizado) {

            return res.status(404).json({

                mensaje:
                    "Ticket no encontrado"

            });

        }



        res.status(200).json({

            mensaje:
                "Ticket actualizado correctamente",

            ticket:
                ticketActualizado

        });



    } catch (error) {


        res.status(400).json({

            mensaje:
                "Error al actualizar ticket",

            error:
                error.message

        });


    }

};



// =====================================
// ELIMINAR TICKET
// DELETE /tickets/:id
// =====================================

exports.eliminarTicket = async (req, res) => {

    try {


        const ticketEliminado =
            await Ticket.findByIdAndDelete(
                req.params.id
            );



        if (!ticketEliminado) {


            return res.status(404).json({

                mensaje:
                    "Ticket no encontrado"

            });


        }



        res.status(200).json({

            mensaje:
                "Ticket eliminado correctamente"

        });



    } catch (error) {


        res.status(500).json({

            mensaje:
                "Error al eliminar ticket",

            error:
                error.message

        });


    }

};



// =====================================
// RESUMEN PARA DASHBOARD
// GET /tickets/resumen
// =====================================

exports.obtenerResumen = async (req, res) => {

    try {


        const total =
            await Ticket.countDocuments();



        const abiertos =
            await Ticket.countDocuments({

                estado: "Abierto"

            });



        const proceso =
            await Ticket.countDocuments({

                estado: "En Proceso"

            });



        const cerrados =
            await Ticket.countDocuments({

                estado: "Cerrado"

            });



        const prioridadAlta =
            await Ticket.countDocuments({

                prioridad: "Alta"

            });



        res.status(200).json({

            total,

            abiertos,

            enProceso: proceso,

            cerrados,

            prioridadAlta

        });



    } catch (error) {


        res.status(500).json({

            mensaje:
                "Error al generar resumen",

            error:
                error.message

        });


    }

};