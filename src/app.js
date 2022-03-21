'use strict'
require('dotenv').config();
var bodyparser = require('body-parser');
const express = require('express');
const port = (process.env.PORT || 3000);

const app = express();

//RUTAS
var usuarios_route = require('./routes/usuariosRoute');
var autobuses_route = require('./routes/autobusesRoute');

//SETINGS
app.set('port', port);


//MIDDLEWARS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Permiso para conectar el backend y frontend
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS, PATCH');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS, PATCH');
    next();
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit: '50mb', extends: true}))

//ROUTES
app.use('/api', usuarios_route);
app.use('/api', autobuses_route);

module.exports = app;