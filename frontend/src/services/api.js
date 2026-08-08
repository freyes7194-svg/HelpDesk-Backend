// =====================================
// CONFIGURACIÓN API BACKEND
// =====================================


const API_URL =
import.meta.env.VITE_API_URL ||
"https://helpdesk-backend-ymmq.onrender.com";




// =====================================
// OBTENER TODOS LOS TICKETS
// GET /tickets
// =====================================


export async function obtenerTickets(){


    const response = await fetch(
        `${API_URL}/tickets`
    );



    const data = await response.json();




    if(!response.ok){


        throw new Error(
            "Error al obtener los tickets"
        );


    }





    // Si el backend devuelve directamente un array

    if(Array.isArray(data)){


        return data;


    }





    // Si devuelve {tickets:[]}

    if(Array.isArray(data.tickets)){


        return data.tickets;


    }





    // Si devuelve {data:[]}

    if(Array.isArray(data.data)){


        return data.data;


    }





    return [];



}









// =====================================
// OBTENER RESUMEN DASHBOARD
// GET /tickets/resumen
// =====================================


export async function obtenerResumen(){



    const response = await fetch(

        `${API_URL}/tickets/resumen`

    );




    const data = await response.json();





    if(!response.ok){


        throw new Error(

            "Error al obtener resumen"

        );


    }



    return data;



}









// =====================================
// CREAR TICKET
// POST /tickets
// =====================================


export async function crearTicket(datos){



    const response = await fetch(

        `${API_URL}/tickets`,

        {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify(datos)


        }

    );





    const data = await response.json();





    if(!response.ok){


        throw new Error(

            data.mensaje ||

            "Error al crear ticket"


        );


    }




    return data.ticket || data;



}









// =====================================
// OBTENER TICKET POR ID
// GET /tickets/:id
// =====================================


export async function obtenerTicket(id){



    const response = await fetch(

        `${API_URL}/tickets/${id}`

    );





    const data = await response.json();





    if(!response.ok){


        throw new Error(

            data.mensaje ||

            "Error al obtener ticket"


        );


    }




    return data.ticket || data;



}









// =====================================
// ACTUALIZAR TICKET
// PUT /tickets/:id
// =====================================


export async function actualizarTicket(
id,
datos
){



    const response = await fetch(

        `${API_URL}/tickets/${id}`,

        {


            method:"PUT",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify(datos)


        }


    );





    const data = await response.json();





    if(!response.ok){


        throw new Error(

            data.mensaje ||

            "Error al actualizar ticket"


        );


    }




    return data.ticket || data;



}









// =====================================
// ELIMINAR TICKET
// DELETE /tickets/:id
// =====================================


export async function eliminarTicket(id){



    const response = await fetch(

        `${API_URL}/tickets/${id}`,

        {


            method:"DELETE"


        }


    );





    const data = await response.json();





    if(!response.ok){


        throw new Error(

            data.mensaje ||

            "Error al eliminar ticket"


        );


    }





    return data;



}