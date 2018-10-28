'use strict';

// Servicio de cambio de moneda

const cote = require('cote');

const responder = new cote.Responder({ name: 'currency conversion responder' });

// Tabla de conversión
// Representa la DB del micro servicio

const rates = {
    usd_eur: 0.88,
    eur_usd: 1.14
};

// Responde a una peticion (req): { from: 'eur', to: 'usd', amount: 25 }
responder.on('convert', (req, done) => {
    console.log('Servicio: petición de', req.from, req.to, req.amount, Date.now());

    // Calculamos el resultado
    const result = rates[`${req.from}_${req.to}`] * req.amount;
    done(result);
});