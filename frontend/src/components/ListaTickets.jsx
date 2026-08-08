import { useEffect, useState } from "react";


import {
    obtenerTickets,
    eliminarTicket,
    actualizarTicket
} from "../services/api";


import FormularioTicket from "./FormularioTicket";





function ListaTickets(){



const [tickets,setTickets]=useState([]);


const [error,setError]=useState("");


const [ticketEditando,setTicketEditando]=useState(null);


const [guardando,setGuardando]=useState(false);







useEffect(()=>{


    cargarTickets();



},[]);







useEffect(()=>{


    function actualizar(){


        cargarTickets();


    }



    window.addEventListener(

        "ticketActualizado",

        actualizar

    );



    return()=>{


        window.removeEventListener(

            "ticketActualizado",

            actualizar

        );


    }



},[]);









async function cargarTickets(){


    try{


        const datos =
            await obtenerTickets();



        setTickets(datos);



    }catch(error){


        setError(

            "Error al cargar tickets"

        );


    }


}









async function eliminar(id){



const confirmar =
window.confirm(

"¿Desea eliminar este ticket?"

);



if(!confirmar){

    return;

}





try{


    await eliminarTicket(id);



    window.dispatchEvent(

        new Event("ticketActualizado")

    );



    cargarTickets();




}catch(error){



    setError(

        "Error al eliminar ticket"

    );


}




}









async function guardarEdicion(datos){



try{


    setGuardando(true);



    await actualizarTicket(

        ticketEditando._id,

        datos

    );



    setTicketEditando(null);



    window.dispatchEvent(

        new Event("ticketActualizado")

    );



    cargarTickets();




}finally{


    setGuardando(false);


}



}









function claseEstado(estado){


    return estado

    ?.replace(" ","-");


}







return(



<div className="lista-tickets">






<h1>

Tickets registrados

</h1>



<p>

Administra los incidentes del sistema

</p>








{

ticketEditando &&



<FormularioTicket


ticketEditando={ticketEditando}


guardarTicket={guardarEdicion}


guardando={guardando}



cancelar={()=>


setTicketEditando(null)


}


/>



}









{

error &&


<div className="error">

{error}

</div>


}









<div className="contenedor-tickets">





{

tickets.map((ticket)=>(




<div

className="ticket-card"

key={ticket._id}

>






<div className="ticket-header">



<h2>

{ticket.titulo}

</h2>




<span

className={

`estado ${claseEstado(ticket.estado)}`

}

>

{ticket.estado}


</span>



</div>








<p>

{ticket.descripcion}

</p>







<div className="datos-ticket">



<div>

Categoría:

<b>

{ticket.categoria}

</b>

</div>




<div>

Prioridad:

<b>

{ticket.prioridad}

</b>

</div>




<div>

Usuario:

<b>

{ticket.usuario}

</b>

</div>



</div>









<div className="acciones">





<button

className="boton-editar"

onClick={()=>


setTicketEditando(ticket)


}

>

Editar

</button>







<button

className="boton-eliminar"

onClick={()=>


eliminar(ticket._id)


}

>

Eliminar

</button>






</div>







</div>





))


}






</div>






</div>



);



}



export default ListaTickets;