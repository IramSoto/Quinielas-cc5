const jwt = require('jsonwebtoken');
const pool = require('../database/database.connection');
//const { pool } = require('../database/database.connection');
const validarJWT = async (req, res, next ) =>{

    const token = req.header('token');
    if ( !token ){
        return res.status(401).json({
            msg: 'El token no se envio'
        })
    }

    try {
        const { uid } = jwt.verify(token , process.env.SECRETORPRIVATEKEY);
        const authUser = await pool.query(`SELECT * FROM Usuarios WHERE idUsuario = ${ uid };`);
        
        req.aUser = authUser.rows; 
        
        

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido' 
        })
    }
    
}
module.exports = {
    validarJWT
}