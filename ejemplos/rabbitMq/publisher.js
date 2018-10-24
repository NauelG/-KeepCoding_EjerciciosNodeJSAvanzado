'use strict';

const connectionPromise = require('./connectAMQP');

const queueName = 'tareas';

// IIFE Inmediatelly Invoked Function Expression
(async () => {

    // Nos aseguramos de estar conectados.
    const conn = await connectionPromise;

    // Conectar a un canal.
    const chanel = await conn.createChannel();

    // Conectar a una cola.
    await chanel.assertQueue(queueName, {
        durable: true // La cola sobrevive a reinicios del broker
    });

    setInterval(() => {

        
        const mensaje = {
            workToDo: 'La tarea de ' + Date.now()
        };
        
        // Mandar un mensaje.
        const result = chanel.sendToQueue(queueName, new Buffer( JSON.stringify(mensaje) ), {
            persistent: true // El mensaje sobrevive a reinicios
        });

        console.log(`Publicado ${mensaje.workToDo} ${result}`);
        
    }, 1000);

})().catch( err => console.log('[PUBLISHER] - Hubo un error', err));