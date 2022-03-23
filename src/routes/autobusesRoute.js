'use strict'
const { Router } = require('express');
const api = Router();
const autobusesController = require('../controllers/autobusesController');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./src/uploads/autobuses'});

api.get('/listar_autobuses', autobusesController.listar_autobuses);
api.post('/registro_autobus', path,autobusesController.registro_autobus);
api.get('/obtener_foto_autobus/:img', autobusesController.obtener_foto_autobus);
api.delete('/eliminar_autobus/:placa', autobusesController.eliminar_autobus);

module.exports = api;