'use strict';

const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
    // Recuperar el código de lenguaje pedido
    const locale = req.params.locale;

    // Guardar la página de retorno
    const backTo = req.get('referer');

    // Establecemos la cookie del nuevo idioma
    res.cookie('nodeapi-lang', locale, { maxAge: 1000 * 60 * 60 * 24 * 14 });

    // Redirigimos al usuario a donde estaba
    res.redirect(backTo);

});

module.exports = router;