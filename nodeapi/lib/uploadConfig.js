'use strict';

const multer = require('multer');
const path = require('path');

// Multer Upload Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Aqui podría elegir la ruta dinamicamente.
        cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

module.exports = multer({ storage: storage });