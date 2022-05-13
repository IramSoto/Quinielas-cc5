const pool = require('../database/database.connection');
const bcryptjs = require('bcryptjs');

const newUser = async( req, res )=>{
    const {username, password} = req.body
    //validar username
    const userExiste = await pool.query(`select username from Usuarios where username = '${username}';`)
    if( userExiste.rows > 0 ){
        return res.status(400).json({
            msg: 'Usuario ya existe'
        });
    }

    //encriptado de contraseña
    const salt = bcryptjs.genSaltSync();
    const cPassword = bcryptjs.hashSync(password, salt);
    const resp = await pool.query(`INSERT INTO public.usuarios(username, pass, tipo, fgrupos, foctavos, fcuartos, fsemi, ffinales) VALUES ( '${username}', '${cPassword}', 'C', 0, 0, 0, 0, 0);`);

    res.json({
        msg: 'Usuario agregado Exitosamente'
    })
}

const viewUsers = async(req, res)=>{
    const resp = await pool.query(`select idusuario, username, fgrupos, foctavos, fcuartos, fsemi, ffinales,(fgrupos+ foctavos+ fcuartos+ fsemi+ ffinales) as PuntosT from usuarios where tipo = 'C'`);
    res.json(resp.rows);
}

const deleteUser = async(req, res)=>{
    const { id } = req.params;
    //verificar que el usuario a elimiar exista
    const exists = await pool.query(`SELECT idUsuario FROM Usuarios WHERE idUsuario = ${id}`);
    if( !(exists.rowCount > 0 ) ){
        return res.status(404).json({
            msg: 'El usuario no existe'
        })
    }
    //que el usuario no se encuentre en otras tablas
    const UserInQui = await pool.query(`SELECT idUsuario FROM Quinielas WHERE idUsuario = ${ id }`);
    if( UserInQui.rowCount > 0  ){
        return res.status(400).json({
            msg: 'Debe elimiar primero las quinielas del usuario'
        });
    }
    //eliminar el usuario
    await pool.query(`DELETE FROM Usuarios where idUsuario = ${id}`);
    res.json({
        msg: 'Usuario Eliminado con exito'
    });
}

const updateUser = async(req,res) =>{
    const { id } = req.params;
    //verificar que el usuario exista
    const exists = await pool.query(`SELECT idUsuario FROM Usuarios WHERE idUsuario = ${id}`);
    if( !(exists.rowCount > 0 ) ){
        return res.status(404).json({
            msg: 'El usuario no existe'
        })
    }
    const { username, password } = req.body

    const salt = bcryptjs.genSaltSync();
    const cPassword = bcryptjs.hashSync(password, salt);
    await pool.query(`UPDATE usuarios SET username = '${username}, pass = '${cPassword}' WHERE idUsuario = ${id}`);
    res.json({
        msg: 'Usuario actualizado con exito'
    });
}

const viewUserById = async(req,res)=>{
    //verificar que el usuario exista

    const { id } = req.params;
    const exists = await pool.query(`SELECT idUsuario FROM Usuarios WHERE idUsuario = ${id}`);
    if( !(exists.rowCount > 0 ) ){
        return res.status(404).json({
            msg: 'El usuario no existe'
        })
    }
    const resp = await pool.query(`select idusuario, username, fgrupos, foctavos, fcuartos, fsemi, ffinales,(fgrupos+ foctavos+ fcuartos+ fsemi+ ffinales) as PuntosT from usuarios where idUsuario = ${id}`);
    res.json(resp.rows);
}
module.exports = {
    newUser,
    viewUsers,
    deleteUser,
    updateUser,
    viewUserById
}