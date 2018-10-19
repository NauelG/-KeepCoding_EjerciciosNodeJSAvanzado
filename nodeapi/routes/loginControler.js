'use strict';

const Usuario = require('../models/Usuario');

// Creamos un Controller que nos servirá asociar a rutas en app.js

class LoginController {

    // GET '/'
    index(req, res, next) {
        res.locals.email = '';
        res.locals.error = '';
        res.render('login');
    }

    // POST
    async post(req, res, next) {

        try {

            // Recuperamos parametros
            const email = req.body.email;
            const password = req.body.password;

            console.log(email, password);

            // Buscamos al usuario
            const usuario = await Usuario.findOne({ email: email });
            console.log('Usuario encontrado:',usuario);

            if ( !usuario || password !== usuario.password ) {

                // Respuesta si no login
                res.locals.email = email;
                res.locals.error = res.__('Invalid credetials');
                res.render('login');

            }

            // Respuesta si login


        } catch(err) {
            next(err);
        }
    }

}

module.exports = new LoginController();