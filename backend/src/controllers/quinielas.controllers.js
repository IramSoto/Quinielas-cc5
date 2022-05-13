const pool = require('../database/database.connection');

const getQuinielas = async(req,res)=>{
    const resp = await pool.query(`Select q.idusuario, u.username, q.idpartido, q.mequipo1,e1.nombre as equipo1, q.mequipo2,e2.nombre as equipo2, pa.gequipo1, pa.gequipo2 FROM quinielas q, usuarios u, partidos pa, equipos e1 , equipos e2 WHERE q.idusuario = u.idusuario AND q.idpartido = pa.idPartido AND pa.idequipo1 = e1.idequipo AND pa.idequipo2 = e2.idequipo`);
    res.json(resp.rows);
}

const getQuiniela = async(req, res)=>{
    const { idpartido, idusuario } = req.body;
    const resp = await pool.query(`Select q.idusuario, u.username, q.idpartido, q.mequipo1,e1.nombre as equipo1, q.mequipo2,e2.nombre as equipo2, pa.gequipo1, pa.gequipo2 FROM quinielas q, usuarios u, partidos pa, equipos e1 , equipos e2 WHERE q.idusuario = u.idusuario AND q.idpartido = pa.idPartido AND pa.idequipo1 = e1.idequipo AND pa.idequipo2 = e2.idequipo AND idpartido = ${idpartido} AND idusuario = ${idusuario}`);
    res.json(resp.rows[0]);
}

const getQuinielasByPartido = async(req,res)=>{
    const { id } = req.params;
    const resp = await pool.query(`Select q.idusuario, u.username, q.idpartido, q.mequipo1,e1.nombre as equipo1, q.mequipo2,e2.nombre as equipo2, pa.gequipo1, pa.gequipo2 FROM quinielas q, usuarios u, partidos pa, equipos e1 , equipos e2 WHERE q.idusuario = u.idusuario AND q.idpartido = pa.idPartido AND pa.idequipo1 = e1.idequipo AND pa.idequipo2 = e2.idequipo AND idpartido = ${id}`);
    res.json(resp.rows);
}

const getQuinielasByUser = async(req,res)=>{
    const { id } = req.params;
    const resp = await pool.query(`Select q.idusuario, u.username, q.idpartido, q.mequipo1,e1.nombre as equipo1, q.mequipo2,e2.nombre as equipo2, pa.gequipo1, pa.gequipo2 FROM quinielas q, usuarios u, partidos pa, equipos e1 , equipos e2 WHERE q.idusuario = u.idusuario AND q.idpartido = pa.idPartido AND pa.idequipo1 = e1.idequipo AND pa.idequipo2 = e2.idequipo AND idusuario = ${id}`);
    res.json(resp.rows);
}

const deleteQuiniela = async (req, res)=>{
    const { idpartido, idusuario } = req.body;

    const exists = await pool.query(`SELECT * From Quinielas WHERE idpartido = ${idpartido} AND idusuario = ${idusuario}`);
    if(exists.rowCount == 0){
        return res.status(400).json({
            msg: 'El Usuario no posee una quiniela de este Partido'
        });
    }

    const resp = await pool.query(`DELETE FROM Quinielas WHERE idpartido = ${idpartido} AND idusuario = ${idusuario}`);
    res.json({
        msg: 'Quiniela eliminada Correctamente'
    });
}

const deleteQuinielaByUser = async(req,res)=>{
    const { id } = req.params;
    const exists = await pool.query(`SELECT * FROM Quinielas WHERE idusuario = ${id}`);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'El usuario no posee quinielas'
        });
    }
    const resp = await pool.query(`DELETE FROM Quinielas WHERE idusuario = ${id}`);
    res.json({
        msg: 'Quinielas del usuario Eliminadas'
    });
}
const deleteQuinielaByPartido = async(req,res)=>{
    const { id } = req.params;
    const exists = await pool.query(`SELECT * FROM Quinielas WHERE idpartido = ${id}`);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'El usuario no posee quinielas'
        });
    }
    const resp = await pool.query(`DELETE FROM Quinielas WHERE idpartido = ${id}`);
    res.json({
        msg: 'Quinielas del usuario Eliminadas'
    });
}

const putQuiniela = async(req,res)=>{
    const { idusuario, idpartido, mequipo1, mequipo2 } = req.body;
    const exists = await pool.query(`SELECT * From Quinielas WHERE idpartido = ${idpartido} AND idusuario = ${idusuario}`);
    if(exists.rowCount == 0){
        return res.status(400).json({
            msg: 'El Usuario no posee una quiniela de este Partido'
        });
    }

    const resp = await pool.query(`UPDATE Quinielas SET mequipo1 = ${mequipo1}, mequipo2 = ${mequipo2} WHERE idpartido = ${idpartido} AND idusuario = ${idusuario};`);
    res.json({
        msg: 'quiniela actualizado correctamente'
    });
}
const postQuinielas = async(req, res)=>{

    const { idusuario, idpartido, mequipo1, mequipo2 } = req.body;
    const exists = await pool.query(`SELECT * From Usuarios WHERE idusuario = ${idusuario}`);
    if(exists.rowCount == 0){
        return res.status(400).json({
            msg: 'El Usuario no existe'
        });
    }

    const exists1 = await pool.query(`SELECT * From Partidos WHERE idpartido = ${idpartido}`);
    if(exists1.rowCount == 0){
        return res.status(400).json({
            msg: 'El Partido no existe'
        });
    }
    const resp = await pool.query(`INSERT INTO quinielas(idusuario, idpartido, mequipo1, mequipo2) VALUES (${idusuario}, ${idpartido}, ${mequipo1}, ${mequipo2});` );
    res.json({
        msg: 'Quiniela agregada con exito'
    });

}

module.exports = {
    getQuinielas,
    getQuinielasByPartido,
    getQuinielasByUser,
    deleteQuiniela,
    deleteQuinielaByPartido,
    deleteQuinielaByUser,
    putQuiniela,
    postQuinielas,
    getQuiniela
}