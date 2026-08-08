import { useEffect, useState } from "react";


function FormularioTicket({

    guardarTicket,

    cancelar,

    ticketEditando,

    guardando

}) {



const [formulario,setFormulario]=useState({

    titulo:"",

    descripcion:"",

    categoria:"Red",

    prioridad:"Media",

    estado:"Abierto",

    usuario:"Usuario"

});







useEffect(()=>{


if(ticketEditando){



setFormulario({

    titulo:
    ticketEditando.titulo || "",


    descripcion:
    ticketEditando.descripcion || "",


    categoria:
    ticketEditando.categoria || "Red",


    prioridad:
    ticketEditando.prioridad || "Media",


    estado:
    ticketEditando.estado || "Abierto",


    usuario:
    ticketEditando.usuario || "Usuario"


});


}



},[ticketEditando]);









function cambiarCampo(e){



setFormulario({

    ...formulario,

    [e.target.name]:
    e.target.value


});


}









async function enviar(e){



e.preventDefault();



await guardarTicket(

    formulario

);




if(!ticketEditando){


setFormulario({

    titulo:"",

    descripcion:"",

    categoria:"Red",

    prioridad:"Media",

    estado:"Abierto",

    usuario:"Usuario"


});


}



}









return(



<div className="formulario-contenedor">





<div className="cabecera-formulario">


<span>

NUEVO INCIDENTE

</span>


<h1>

{

ticketEditando

?

"Editar ticket"

:

"Registrar ticket"

}


</h1>


<p>

Completa la información del incidente.

</p>



</div>









<form

className="formulario-ticket"

onSubmit={enviar}

>









<label>

Título del incidente

</label>



<input


type="text"


name="titulo"


value={formulario.titulo}


onChange={cambiarCampo}


placeholder="Ej: Problema con conexión de red"


required


/>



<label>

Descripción

</label>




<textarea


name="descripcion"


value={formulario.descripcion}


onChange={cambiarCampo}


placeholder="Describe el problema encontrado"


required


/>









<div className="fila-formulario">





<div>


<label>

Categoría

</label>



<select


name="categoria"


value={formulario.categoria}


onChange={cambiarCampo}


>


<option>

Red

</option>


<option>

Hardware

</option>


<option>

Software

</option>



</select>


</div>







<div>


<label>

Prioridad

</label>



<select


name="prioridad"


value={formulario.prioridad}


onChange={cambiarCampo}


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


</div>





</div>








<label>

Estado

</label>



<select


name="estado"


value={formulario.estado}


onChange={cambiarCampo}


>


<option>

Abierto

</option>



<option>

En Proceso

</option>



<option>

Cerrado

</option>



</select>








<label>

Usuario

</label>




<input


type="text"


name="usuario"


value={formulario.usuario}


onChange={cambiarCampo}


/>








<div className="acciones-formulario">






<button


className="guardar"


disabled={guardando}


>


{

guardando

?

"Guardando..."

:

"Guardar ticket"

}



</button>








{

cancelar &&


<button


type="button"


className="cancelar"


onClick={cancelar}


>


Cancelar


</button>


}





</div>







</form>





</div>



);



}



export default FormularioTicket;