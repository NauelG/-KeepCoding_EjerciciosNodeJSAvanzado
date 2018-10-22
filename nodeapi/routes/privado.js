'use strict';

const express = require('express');
const router = express.Router();
const sessionAuth = require('../lib/sessionAuth');
const Usuario = require('../models/Usuario');
const { body, validationResult } = require('express-validator/check');

/**
 * Pasamos por el middleware de auth todas las peticiones de la ruta.
 */
router.use(sessionAuth());

/**
 * GET /privado
 */
router.get('/', (req, res, next) => {

    res.render('privado');
    
});

/**
 * POST /sendEmail
 * Envía un email al usuario logueado en el site.
 */
router.post('/sendEmail',[
    body('texto').isString().withMessage('debe ser un texto') // Validaciones del body
], async (req, res, next) => {

    try {

        validationResult(req).throw() // Pasa los errores de validación a next(err)

        const texto = req.body.texto;
    
        // Le enviamos un email.
        await req.user.sendEmail('NodeAPI <admin@nodeapi.com>', 'Prueba de email', texto);

        // Respondemos.
        res.json({ success: true, result: 'Sent'});

    } catch(err) {
        next(err);
        return;
    }
});

module.exports = router;