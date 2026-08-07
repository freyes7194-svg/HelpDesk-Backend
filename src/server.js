require("dotenv").config();


const app = require("./app");



const PORT = process.env.PORT || 5055;



app.listen(PORT,()=>{


    console.log(
        `Servidor ejecutándose en puerto ${PORT}`
    );


});