'use strict';

const amqplib = require('amqplib');
require('dotenv').config(); // Carga las variables de entorno desde .env
const url = process.env.AMQP_URL;

const connectionPromise = amqplib.connect(url)
    .catch( err => {
        console.log('[AMQP]', err);
    });

module.exports = connectionPromise;