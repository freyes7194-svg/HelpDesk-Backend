const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prioridad = sequelize.define("Prioridad", {

    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

module.exports = Prioridad;