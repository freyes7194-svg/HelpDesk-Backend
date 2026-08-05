const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tecnico = sequelize.define("Tecnico", {

    especialidad:{
        type:DataTypes.STRING,
        allowNull:false
    },

    disponibilidad:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }

});

module.exports = Tecnico;