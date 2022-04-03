'use strict'
const { Router } = require('express');
const api = Router();
const estudiantesController = require('../controllers/estudiantesController');

api.post('/registro_estudiante', estudiantesController.registro_estudiante);
api.get('/lista_estudiantes', estudiantesController.lista_estudiantes);
api.post('/registro_estudiante_direccion', estudiantesController.registro_estudiante_direccion);
api.delete('/eliminar_estudiante/:cedula', estudiantesController.eliminar_estudiante);
api.put('/editar_estudiante', estudiantesController.editar_estudiante);




api.get('/obtener_foto_estudiante/:img', estudiantesController.obtener_foto_estudiante);

module.exports = api;