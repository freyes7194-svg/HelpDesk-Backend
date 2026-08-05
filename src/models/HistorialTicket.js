const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HistorialTicket = sequelize.define("HistorialTicket", {

    estadoAnterior:{
        type:DataTypes.STRING
    },

    estadoNuevo:{
        type:DataTypes.STRING
    },

    fechaCambio:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }

});

module.exports = HistorialTicket;