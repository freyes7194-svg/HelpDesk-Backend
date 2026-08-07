const Ticket = require("./Ticket");
const Usuario = require("./Usuario");
const Categoria = require("./Categoria");
const Prioridad = require("./Prioridad");
const Estado = require("./Estado");
const Tecnico = require("./Tecnico");


// Relaciones


Categoria.hasMany(Ticket);

Ticket.belongsTo(Categoria);



Prioridad.hasMany(Ticket);

Ticket.belongsTo(Prioridad);



Estado.hasMany(Ticket);

Ticket.belongsTo(Estado);



Usuario.hasMany(Ticket);

Ticket.belongsTo(Usuario);



Tecnico.hasMany(Ticket);

Ticket.belongsTo(Tecnico);



module.exports = {

    Ticket,

    Usuario,

    Categoria,

    Prioridad,

    Estado,

    Tecnico

};