const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://helpdesk-backend-ymmq.onrender.com";


// =============================
// OBTENER TODOS LOS TICKETS
// =============================

export async function obtenerTickets() {

    const response = await fetch(
        `${API_URL}/tickets`
    );


    if (!response.ok) {

        throw new Error(
            "Error al obtener los tickets"
        );

    }


    const data = await response.json();


    return data.data || [];

}



// =============================
// OBTENER RESUMEN DEL DASHBOARD
// =============================

export async function obtenerResumen() {


    const response = await fetch(
        `${API_URL}/tickets/resumen`
    );


    if (!response.ok) {


        throw new Error(
            "Error al obtener el resumen"
        );


    }


    const data = await response.json();


    return data;


}



// =============================
// CREAR TICKET
// =============================

export async function crearTicket(datos) {


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
            "Error al crear el ticket"

        );


    }



    return data.data;



}



// =============================
// OBTENER TICKET POR ID
// =============================

export async function obtenerTicket(id) {


    const response = await fetch(

        `${API_URL}/tickets/${id}`

    );



    const data = await response.json();



    if(!response.ok){


        throw new Error(

            data.mensaje ||
            "Error al obtener el ticket"

        );


    }



    return data.data;



}



// =============================
// ACTUALIZAR TICKET
// =============================

export async function actualizarTicket(id, datos) {


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
            "Error al actualizar el ticket"

        );


    }



    return data.data;



}



// =============================
// ELIMINAR TICKET
// =============================

export async function eliminarTicket(id) {


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
            "Error al eliminar el ticket"

        );


    }



    return data;



}