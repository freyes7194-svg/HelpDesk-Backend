const Ticket = require("./Ticket");
const Usuario = require("./Usuario");
const Rol = require("./Rol");
const Tecnico = require("./Tecnico");
const Categoria = require("./Categoria");
const Prioridad = require("./Prioridad");
const Estado = require("./Estado");
const HistorialTicket = require("./HistorialTicket");


// Rol - Usuario

Rol.hasMany(Usuario);
Usuario.belongsTo(Rol);


// Usuario - Ticket

Usuario.hasMany(Ticket);
Ticket.belongsTo(Usuario);


// Técnico - Ticket

Tecnico.hasMany(Ticket);
Ticket.belongsTo(Tecnico);


// Catálogos - Ticket

Categoria.hasMany(Ticket);
Ticket.belongsTo(Categoria);

Prioridad.hasMany(Ticket);
Ticket.belongsTo(Prioridad);

Estado.hasMany(Ticket);
Ticket.belongsTo(Estado);


// Historial

Ticket.hasMany(HistorialTicket);
HistorialTicket.belongsTo(Ticket);


module.exports = {
    Ticket,
    Usuario,
    Rol,
    Tecnico,
    Categoria,
    Prioridad,
    Estado,
    HistorialTicket
};