'use strict'
const util = require('util');
const connection = require('../database/conexion');
const query = util.promisify(connection.query).bind(connection);
const { encrypt, compare} = require('../helpers/handleBcrypt');
const bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/jwt');

const login = async function(req, res) {
    try{
        var data = req.body;
        let sql = `Select * from usuarios where email= ${connection.escape(data.email)};`;
        const reg = await query(sql);
        if(reg != ""){
            const verificarPassword = await bcrypt.compare(data.password,reg[0].password,async function(err, check){
                if(check){
                    res.status(200).send({
                        data:reg[0],
                        token: createToken(reg[0]),
                        message: 'Inicio de sesión correcto'
                    });
                }else{
                    res.status(401).send({reg:[],message:"El correo electrónico o contraseña son incorrectos"});
                }
            });
        }else{
            res.status(401).send({reg,message:"El correo electrónico o contraseña son incorrectos"});
        }
    }catch(error){
        console.log("error -> ", error)
    }
}

const registro = async function(req, res) {
    try{
        var data = req.body;
        let sql1 = `Select * from usuarios where cedula = ${connection.escape(data.cedula)}`;
        const reg1 = await query(sql1);
        if(reg1==""){
            let sql2 = `Select * from usuarios where email = ${connection.escape(data.email)}`;
            const reg2 = await query(sql2);
            if(reg2==""){
                const passwordHash = await encrypt(data.password);
                let sql3 = `Insert into usuarios(cedula,nombres,apellidos,email,password,rol,email_validado) 
                values(${connection.escape(data.cedula)},${connection.escape(data.nombres)},${connection.escape(data.apellidos)},${connection.escape(data.email)},${connection.escape(passwordHash)},${connection.escape(data.rol)},'FALSE');`;
                const reg3 = await query(sql3);
                let sql4 = `Select * from usuarios where email= ${connection.escape(data.email)};`;
                const reg4 = await query(sql4);
                res.status(200).send({
                    data: reg4[0],
                    message:"Exito"
                });
            }else{
            res.status(401).send({reg2,message:"El correo electrónico ya está registrado"});
            }            
        }else{
            res.status(401).send({reg1,message:"El número de cédula ya está registrado"});
        }
    }catch(error){
        console.log("error -> ", error)
    }
}

module.exports = {
    login,
    registro
}
