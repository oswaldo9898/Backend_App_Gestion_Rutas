'use strict'
const { Router } = require('express');
const api = Router();
const autobusesController = require('../controllers/autobusesController');

api.post('/registro_autobus', autobusesController.registro_autobus);
api.get('/lista_autobuses', autobusesController.lista_autobuses);
api.delete('/eliminar_autobus/:idautobus', autobusesController.eliminar_autobus);
api.put('/editar_autobus', autobusesController.editar_autobus);
api.get('/obtener_foto_autobus/:img', autobusesController.obtener_foto_autobus);

module.exports = api;