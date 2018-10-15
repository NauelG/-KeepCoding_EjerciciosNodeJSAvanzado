var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
    // La vista se renderiza EN EL SERVIDOR

    const segundo = new Date().getSeconds();


    res.locals.valor = '<script>alert("HolaMundo")</script>';
    res.render('index', {
        condicion: {
            segundo, // Sería lo mismo que poner segundo:segundo
            par: segundo % 2 === 0
        },
        users: [
            { name: 'Smith', age: 20 },
            { name: 'Jones', age: 18 },
            { name: 'Thomas', age: 21 }
        ]
    });
});

router.get('/otrapagina', function(req, res, next) {
    // res.send('Ok');

    next(new Error('No permitido'));
});

router.get('/paramenruta/:dato', (req, res, next) => {
    const dato = req.params.dato;
    res.send('Ok, recibido dato:' + dato);
});

router.get('/paramenrutaopt/:dato?', (req, res, next) => {
    const dato = req.params.dato;
    res.send('Ok, recibido dato opcional:' + dato);
});

router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
    const id = req.params.id;
    console.log(req.params)
    res.send('Ok, recibido dato opcional:' + id);
});

router.get('/query', [
    query('talla').isNumeric().withMessage('Debe ser un número')
], (req, res, next) => {
    // Los parametros pasados por query string no se tienen que definir en la ruta
    console.log(req.query);
    validationResult(req).throw(); // Este metodo pasa los errores de validación a next(err)
    res.send('Ok, recibidos los datos');
});

router.post('/body', (req, res, next) => {
    console.log('req.body', req.body);
    res.send('Ok, recibido en el body');
});

module.exports = router;