'use strict'
const { Router } = require('express');
const api = Router();
const usuariosController = require('../controllers/usuariosController');

api.post('/login', usuariosController.login);
api.post('/registro', usuariosController.registro);
api.get('/obtener_representante_libre', usuariosController.obtener_representante_libre);
api.get('/obtener_representante_asignado/:cedulaEst', usuariosController.obtener_representante_asignado);
api.post('/registro_representante/:cedulaEst/:cedula', usuariosController.registro_representante);
api.delete('/eliminar_representante_asignado/:cedulaEst', usuariosController.eliminar_representante_asignado);

module.exports = api;