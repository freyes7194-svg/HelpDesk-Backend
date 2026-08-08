import { useEffect, useState } from "react";

import { obtenerResumen } from "../services/api";



function Navbar({ cambiarVista }) {


const [totalTickets,setTotalTickets] = useState(0);




useEffect(()=>{


    cargarTotal();


},[]);





async function cargarTotal(){


    try{


        const datos =
            await obtenerResumen();



        setTotalTickets(
            datos.total || 0
        );



    }catch(error){


        console.error(
            "Error cargando contador",
            error
        );


    }


}





return(


<nav className="navbar">



<div className="marca">


<div className="logo-hd">

HD

</div>



<div className="texto-logo">


<h2>

HELP DESK

</h2>


<span>

Gestión de incidentes

</span>


</div>


</div>







<div className="menu">



<button

onClick={()=>cambiarVista("dashboard")}

>

Dashboard

</button>





<button

onClick={()=>cambiarVista("tickets")}

>

Tickets


<span className="contador">

{totalTickets}

</span>


</button>







<button

className="nuevo"

onClick={()=>cambiarVista("registrar")}

>

+ Nuevo ticket

</button>





</div>




</nav>


);


}


export default Navbar;