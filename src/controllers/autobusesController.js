'use strict'
const util = require('util');
const connection = require('../database/conexion');
const query = util.promisify(connection.query).bind(connection);
var fs = require('fs');
var path = require('path');

const listar_autobuses = async function(req, res) {
    try{
        let sql = 'Select * from autobuses;';
        const reg = await query(sql);
        res.status(200).send({data:reg});
    }catch(error){
        console.log("error -> ", error)
    }
    
}

const registro_autobus = async function(req, res) {
    try{
        var data = req.body;        
        var img_path = req.files.foto.path;
        var name = img_path.split('\\');
        var portada_name = name[3];        
        data.foto = portada_name;
        let sql1 = `Select * from autobuses where placa= ${connection.escape(data.placa)};`;
        const reg1 = await query(sql1);
        if(reg1==""){
            let sql2 = `Insert into autobuses(idautobus,marca,modelo,placa,foto) 
                values(${connection.escape(data.placa)},${connection.escape(data.marca)},${connection.escape(data.modelo)},${connection.escape(data.placa)},${connection.escape(data.foto)});`;
                const reg2 = await query(sql2);
                res.status(200).send({data:reg2,message:"Exito"});
        }else{
            res.status(200).send({reg1,message:"El número de placa ya está registrado"});
        }
    }catch(error){
        console.log("error -> ", error)
    }
}

const obtener_foto_autobus = async function(req, res){
    var img = req.params['img'];
    fs.stat('./src/uploads/autobuses/'+img, function(err){
        if(!err){
            let path_img = './src/uploads/autobuses/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './src/uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}


module.exports = {
    listar_autobuses,
    registro_autobus,
    obtener_foto_autobus
}
