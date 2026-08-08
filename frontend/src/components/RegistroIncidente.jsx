import { useState } from "react";
import { crearTicket } from "../services/api";


function RegistrarIncidente(){

    const [ticket,setTicket] = useState({

        titulo:"",
        descripcion:"",
        categoria:"Hardware",
        prioridad:"Media",
        estado:"Abierto"

    });


    const [mensaje,setMensaje] = useState("");



    function cambiar(e){

        setTicket({

            ...ticket,

            [e.target.name]: e.target.value

        });

    }



    async function guardar(e){

        e.preventDefault();


        try{


            await crearTicket(ticket);


            setMensaje(
                "Ticket creado correctamente"
            );


            setTicket({

                titulo:"",
                descripcion:"",
                categoria:"Hardware",
                prioridad:"Media",
                estado:"Abierto"

            });



        }catch(error){


            setMensaje(
                "Error al crear ticket"
            );


        }

    }




    return (

        <div>

            <h2>
                Nuevo ticket
            </h2>


            <form onSubmit={guardar}>


                <input

                    name="titulo"

                    placeholder="Título"

                    value={ticket.titulo}

                    onChange={cambiar}

                    required

                />



                <textarea

                    name="descripcion"

                    placeholder="Descripción"

                    value={ticket.descripcion}

                    onChange={cambiar}

                    required

                />



                <select
                    name="categoria"
                    value={ticket.categoria}
                    onChange={cambiar}
                >

                    <option>
                        Hardware
                    </option>

                    <option>
                        Software
                    </option>

                    <option>
                        Red
                    </option>

                </select>




                <select

                    name="prioridad"

                    value={ticket.prioridad}

                    onChange={cambiar}

                >

                    <option>
                        Alta
                    </option>

                    <option>
                        Media
                    </option>

                    <option>
                        Baja
                    </option>


                </select>




                <button type="submit">

                    Crear ticket

                </button>


            </form>



            <p>
                {mensaje}
            </p>


        </div>

    );

}


export default RegistrarIncidente;