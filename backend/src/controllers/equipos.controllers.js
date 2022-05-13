const pool = require('../database/database.connection');


const getEquipos = async(req, res)=>{
    const resp = await pool.query(`SELECT idequipo, bandera, nombre, grupo, (pg + pe + pp) AS pj,pg,pp,pe,ga,ge,(ga-ge)AS dg, ((pg*3)+pe) as puntos FROM Equipos`);
    res.json( resp.rows );
}

const getEquipoById = async(req, res)=>{
    console.log('hola');
    const { id } = req.params;
    //ver si el quipo exista
    const exists = await pool.query(`SELECT idequipo,bandera, nombre, grupo, (pg + pe + pp) AS pj,pg,pp,pe,ga,ge,(ga-ge)AS dg FROM Equipos WHERE idEquipo = ${id}`);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'El id del equipo es incorrecto'
        });
    }
    res.json(exists.rows[0]);
}

const getEquipoByTeam = async(req, res)=>{
    const { grupo } = req.body;
    //ver si el quipo exista
    const exists = await pool.query(`SELECT idequipo, bandera, nombre, grupo, (pg + pe + pp) AS pj,pg,pp,pe,ga,ge,(ga-ge)AS dg FROM Equipos WHERE grupo = '${grupo}'`);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'No hay Equipos en ese grupo'
        });
    }
    res.json(exists.rows);
}

const postEquipo = async(req,res)=>{
    //obtenemos el datos del body
    const { nombre, bandera, grupo } = req.body;
    //comprobar que el equipo no exista 
    const exists = await pool.query(`SELECT idEquipo FROM Equipos WHERE nombre = '${nombre}'`);
    if( exists.rowCount != 0){
        return res.status(400).json({
            msg: 'El Equipo ya existe'
        });
    }
    //Agregando equipo a la base de datos
    const resp = await pool.query(`INSERT INTO public.equipos(nombre, bandera, grupo, pg, pp, pe, ga, ge) VALUES ( '${nombre}', '${bandera}', '${grupo}', 0, 0, 0, 0, 0);`);
    res.json({
        msg: 'Equipo agregado con exito'
    });
}

const putEquipo = async(req, res)=>{
    const { id } = req.params;
    const { nombre, bandera, grupo, pg, pp, pe, ga, ge } = req.body;
    const exists = await pool.query(`SELECT idEquipo FROM Equipos WHERE idEquipos = ${id}`);
    if( exists.rowCount == 0){
        return res.status(400).json({
            msg: 'El Equipo no existe'
        });
    }
    const resp = await pool.query(`UPDATE Equipos SET nombre = '${nombre}', bandera = '${bandera}', grupo ='${grupo}', pg = ${pg}, pp=${pp}, pe=${pe}, ga=${ga}, ge=${ge};`);
    res.json({
        msg: 'El Equipo se actualizo con exito'
    });
}

const deleteEquipo = async(req,res)=>{
    const { id } = req.params;
    //comprobar que exista el equipo 
    const exists = await pool.query(`SELECT idEquipo FROM Equipos WHERE idEquipos = ${id}`);
    if( exists.rowCount == 0){
        return res.status(400).json({
            msg: 'El Equipo no existe'
        });
    }
    //verificar que no este relacionado con otra tabla
    const related = await pool.query(`SELECT idPartido FROM Partidos WHERE idEquipo1 = ${id} OR idEquipo2 =${id};`);
    if ( related.rowCount != 0 ){
        return res.status(400).json({
            msg: 'Primero elimine los partidos en los que se encuentra el equipo'
        });
    }
    await pool.query(`DELETE FROM Equipos WHERE idEquipo = ${ id }`);
    res.json({
        msg: 'Equipo Eliminado Correctamente'
    });
}

module.exports = {
    getEquipos,
    getEquipoById,
    postEquipo,
    putEquipo,
    deleteEquipo,
    getEquipoByTeam
}