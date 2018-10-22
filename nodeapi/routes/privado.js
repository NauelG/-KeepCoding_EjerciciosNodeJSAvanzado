'use strict';

const express = require('express');
const router = express.Router();
const sessionAuth = require('../lib/sessionAuth');
const Usuario = require('../models/Usuario');

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
router.post('/sendEmail', async (req, res, next) => {

    try {

        const texto = req.body.texto;

        // Recuperamos el usuario.
        const usuario = await Usuario.findById(req.session.authUser._id);
    
        // Le enviamos un email.
        usuario.sendEmail('NodeAPI <admin@nodeapi.com>', 'Prueba de email', texto);
        // Respondemos.
        res.json({ success: true, result: 'Sent'});
    } catch(err) {
        next(err);
        return;
    }
});

module.exports = router;