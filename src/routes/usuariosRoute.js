'use strict'
const { Router } = require('express');
const api = Router();
const usuariosController = require('../controllers/usuariosController');

api.post('/login', usuariosController.login);
api.post('/registro', usuariosController.registro);

module.exports = api;