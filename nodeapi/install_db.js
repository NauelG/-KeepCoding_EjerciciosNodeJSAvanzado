'use strict';

require('dotenv').config();

const readline = require('readline');

const agentes = require('./data/agentes.json').agentes;
const conn = require('./lib/connectMongoose');
const Agente = require('./models/Agente');

conn.once('open', async() => {
    try {
        const response = await askUser('Estás seguro que quieres borrar los contenidos de la base de datos? (no)');

        if (response.toLowerCase() !== 'yes') {
            console.log('Proceso abortado');
            process.exit(1);
        }

        await initAgentes(agentes);
        // await init users...
        // await init otro...
        // ...

        conn.close();

    } catch (err) {
        console.log('Hubo un error', err);
        process.exit(1);
    }
});

function askUser(question) {
    return new Promise((resolve, reject) => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question,
            function(answer) {
                rl.close();
                resolve(answer);
            }
        )

    });
}


async function initAgentes(agentes) {
    // Eliminar los documentos actuales
    const deleted = await Agente.deleteMany();
    console.log(`Eliminados ${deleted.n} agentes.`);

    // Cargar los nuevos documentos
    const inserted = await Agente.insertMany(agentes);
    console.log(`Insertados ${inserted.length} agentes.`);
}