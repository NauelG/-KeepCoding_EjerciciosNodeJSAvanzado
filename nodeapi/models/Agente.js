'use strict';

const mongoose = require('mongoose');

// Definir un esquema
const agenteSchema = mongoose.Schema({
    name: String,
    age: Number
});

// creamos un método estatico
agenteSchema.statics.listar = function(filtro, limit, skip, fields, sort) {
    const query = Agente.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}

// Crear el modelo con ese esquema
const Agente = mongoose.model('Agente', agenteSchema);

// Y, aunque no haga falta, lo exportamos
module.exports = Agente;