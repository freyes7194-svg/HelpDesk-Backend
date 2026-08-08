import { useState } from "react";


import Navbar from "./components/Navbar";

import Dashboard from "./components/Dashboard";

import ListaTickets from "./components/ListaTickets";

import FormularioTicket from "./components/FormularioTicket";


import {
    crearTicket
} from "./services/api";


import "./style.css";





function App(){



const [vista,setVista] = useState(
    "dashboard"
);



const [guardando,setGuardando] = useState(
    false
);







async function guardarNuevoTicket(datos){



    try{



        setGuardando(true);




        await crearTicket(datos);





        // Avisar a Dashboard y Navbar
        window.dispatchEvent(
            new Event("ticketActualizado")
        );






        alert(

            "El incidente fue registrado correctamente"

        );





        setVista(

            "tickets"

        );





    }catch(error){



        alert(

            error.message

        );



    }finally{



        setGuardando(false);



    }



}








return(


<>


<Navbar

    cambiarVista={setVista}

/>







{

vista==="dashboard" &&


<Dashboard/>


}








{

vista==="registrar" &&



<FormularioTicket


    guardarTicket={
        guardarNuevoTicket
    }



    guardando={
        guardando
    }




    cancelar={()=>


        setVista("dashboard")


    }


/>



}







{

vista==="tickets" &&


<ListaTickets/>


}




</>


);



}




export default App;