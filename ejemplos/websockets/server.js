'use strict';

const app = require('express')();
const server = require('http').Server(app);

app.get('/', (req, res, next)=> {
    res.send('OK');
});

server.listen(3000, () => {
    console.log('Listening on port 3000')
});
