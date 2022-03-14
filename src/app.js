'use strict'
require('dotenv').config();
const express = require('express');
const port = (process.env.PORT || 3000);

const app = express();

//RUTAS
//var usuario_route = require('./routes/usuario.route');

//SETINGS
app.set('port', port);


//MIDDLEWARS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
//app.use('/api', usuario_route);

module.exports = app;