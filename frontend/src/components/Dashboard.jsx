import { useEffect, useState } from "react";

import { obtenerResumen } from "../services/api";

import "../style.css";


function Dashboard(){


const [resumen,setResumen]=useState({

    total:0,

    abiertos:0,

    enProceso:0,

    cerrados:0,

    prioridadAlta:0,

    criticos:0

});



const [error,setError]=useState("");





useEffect(()=>{


    cargarResumen();


},[]);





async function cargarResumen(){


    try{


        const datos =
            await obtenerResumen();



        setResumen(datos);



    }catch(error){


        setError(
            "Error al cargar resumen"
        );


    }


}





const tarjetas=[


{

titulo:"Total de tickets",

valor:resumen.total,

descripcion:
"Todos los incidentes registrados",

clase:"tarjeta-marino",

icono:"TT"

},



{

titulo:"Tickets abiertos",

valor:resumen.abiertos,

descripcion:
"Incidentes pendientes de atención",

clase:"tarjeta-azul",

icono:"AB"

},



{

titulo:"En proceso",

valor:resumen.enProceso,

descripcion:
"Incidentes que están siendo atendidos",

clase:"tarjeta-turquesa",

icono:"EP"

},



{

titulo:"Tickets cerrados",

valor:resumen.cerrados,

descripcion:
"Incidentes finalizados",

clase:"tarjeta-verde",

icono:"CE"

},



{

titulo:"Prioridad alta",

valor:resumen.prioridadAlta,

descripcion:
"Incidentes que requieren atención",

clase:"tarjeta-naranja",

icono:"PA"

},



{

titulo:"Tickets críticos",

valor:resumen.criticos,

descripcion:
"Incidentes de máxima prioridad",

clase:"tarjeta-roja",

icono:"CR"

}


];






return(


<div className="dashboard">



<div className="encabezado-dashboard">


<div>


<div className="subtitulo">

RESUMEN GENERAL

</div>



<h1>

Panel de control

</h1>



<p>

Consulta el estado actual de los tickets registrados en el sistema.

</p>


</div>




<button className="boton-admin">

Administrar tickets

</button>


</div>






<div className="grid-tarjetas">



{

tarjetas.map((tarjeta,index)=>(



<div

className={`tarjeta ${tarjeta.clase}`}

key={index}

>


<div className="tarjeta-arriba">


<div className="icono">

{tarjeta.icono}

</div>


<div className="actual">

ACTUAL

</div>


</div>



<h2>

{tarjeta.valor}

</h2>



<h3>

{tarjeta.titulo}

</h3>



<p>

{tarjeta.descripcion}

</p>



</div>



))


}



</div>





{

error &&

<div className="error">

{error}

</div>

}



</div>


);


}


export default Dashboard;