const app = require("./app");
const sequelize = require("./config/database");

const {
    Rol,
    Usuario,
    Tecnico,
    Categoria,
    Prioridad,
    Estado
} = require("./models");


const PORT = 5055;


async function cargarDatosIniciales(){

    // Roles
    await Rol.bulkCreate([
        {nombre:"Usuario final"},
        {nombre:"Técnico de soporte"},
        {nombre:"Administrador de sistemas"}
    ],{
        ignoreDuplicates:true
    });


    // Categorías
    await Categoria.bulkCreate([
        {nombre:"Hardware"},
        {nombre:"Red"},
        {nombre:"Software"}
    ],{
        ignoreDuplicates:true
    });


    // Prioridades
    await Prioridad.bulkCreate([
        {nombre:"Alta"},
        {nombre:"Media"},
        {nombre:"Baja"}
    ],{
        ignoreDuplicates:true
    });


    // Estados
    await Estado.bulkCreate([
        {nombre:"Abierto"},
        {nombre:"Asignado"},
        {nombre:"En proceso"},
        {nombre:"Escalado"},
        {nombre:"Resuelto"},
        {nombre:"Cerrado"}
    ],{
        ignoreDuplicates:true
    });


    // Usuario prueba
    await Usuario.create({
        nombre:"Carlos Mendoza",
        correo:"carlos@helpdesk.com",
        RolId:1
    }).catch(()=>{});


    // Técnicos prueba
    await Tecnico.create({
        especialidad:"Red y Hardware",
        disponibilidad:true
    }).catch(()=>{});


    console.log("✅ Datos iniciales cargados");

}



async function iniciar(){

    try{

        await sequelize.sync({alter:true});


        await cargarDatosIniciales();


        app.listen(PORT,()=>{

            console.log(
                `🚀 Servidor ejecutándose en http://localhost:${PORT}`
            );

        });


    }catch(error){

        console.error(
            "❌ Error:",
            error.message
        );

    }

}


iniciar();