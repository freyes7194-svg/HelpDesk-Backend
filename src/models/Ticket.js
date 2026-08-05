const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ticket = sequelize.define("Ticket", {

    numero: {
        type: DataTypes.STRING,
        unique: true
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

});

module.exports = Ticket;