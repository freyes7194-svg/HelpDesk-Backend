const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Estado = sequelize.define("Estado", {

    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

module.exports = Estado;