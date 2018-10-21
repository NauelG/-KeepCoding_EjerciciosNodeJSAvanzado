'use strict';

/**
 * Middleware que sirve para comprovar si un usuario está autenticado.
 * 
 * Verifica si la sesión tiene un _id y si no lo tiene redirige al usuario al login.
 */

module.exports = function() {
    return function(req, res, next) {

        if (!req.session.authUser) {
            // Res si no logado.
            res.redirect('/login');
            return;
        }

        // Res si logado.
        next();
        
    };
};
