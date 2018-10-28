'use strict';

const cote = require('cote');

// Cliente de conversión de divisas

const requester = new cote.Requester({ name: 'Currency conversion client' });

setInterval(() => {
    requester.send({
        type: 'convert', // Quien sea que escuche peticiones de tipo convert
        amount: 100,
        from: 'usd',
        to: 'eur'
    }, res => {
        console.log(`Cliente: 100 usd ---> ${res} eur`, Date.now());
    });
}, 1000);