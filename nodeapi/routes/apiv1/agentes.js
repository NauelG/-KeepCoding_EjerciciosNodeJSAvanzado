'use strict';

const express = require('express');
const router = express.Router();
var createError = require('http-errors');

const Agente = require('../../models/Agente');

// GET devuelve una lista de agentes

router.get('/', async(req, res, next) => {
    try {

        // Recuperar datos entrada
        const name = req.query.name;
        const age = req.query.age;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;

        // crear filtro vacio
        const filtro = {};

        if (name) {
            filtro.name = name
        };
        if (age) {
            filtro.age = age
        };

        const agentes = await Agente.listar(filtro, limit, skip, fields, sort);
        res.json({ success: true, result: agentes });
    } catch (err) {
        next(err)
    }
});

// GET /:id retorna un agente
router.get('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;

        const agente = await Agente.findById(_id).exec();

        if (!agente) {
            next(createError(404));
            return;
        }

        res.json({ success: true, result: agente });

    } catch (err) {
        next(err);
    }
});

// POST crea un agente en la colección

router.post('/', async(req, res, next) => {
    try {
        const datosAgente = req.body;

        // Crear un agente en memoria
        const agente = new Agente(datosAgente);
        // Guardarlo en la DB
        const agenteGuardado = await agente.save();
        res.json({ success: true, result: agenteGuardado });
    } catch (err) {
        next(err);
    }
});

// DELETE elimina un agente por id
router.delete('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;
        await Agente.remove({ _id: _id }).exec();

        res.json({ success: true })
    } catch (err) {
        next(err);
    }
});

// PUT actualiza un agente
router.put('/:id', async(req, res, next) => {
    try {
        const _id = req.params.id;
        const datosAgente = req.body;

        const agenteActualizado = await Agente.findByIdAndUpdate(_id, datosAgente, { new: true }).exec();
        res.json({ success: true, result: agenteActualizado })
    } catch (err) {
        next(err);
    }
});


module.exports = router;