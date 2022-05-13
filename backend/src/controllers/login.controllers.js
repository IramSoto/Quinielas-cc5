const { response, request } = require ('express');
const  pool = require('../database/database.connection')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { validationResult } = require('express-validator');



const login = async( req , res )=>{
    const {username, password} = req.body
    const resp = await pool.query(`Select idUsuario, username, pass, tipo FROM Usuarios WHERE username = '${username}';`)
    //validar que el usuario exista
    if(resp.rowCount != 1 ){
        return res.status(400).json({
            msg: 'Usuario o contraseña incorrecta'
        });
    }
    const validPassword = bcryptjs.compareSync(password, resp.rows[0].pass);
    if(!validPassword){
        return res.status(400).json({
            msg: 'Usuario o contraseña incorrecta'
        })
    }
    
    //generar jwt
    const token = await generarJWT( resp.rows[0].idusuario );
    const tipo = resp.rows[0].tipo;
    res.json({
        token: token,
        role: tipo,
        msg: 'Login realizado con exito'
    });
}

module.exports = {
    login
}
