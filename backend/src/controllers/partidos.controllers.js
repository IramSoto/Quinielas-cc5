const pool = require('../database/database.connection');

const getPartidos = async (req, res)=>{
    const resp = await pool.query(`select pa.idPartido,e1.bandera as bandera1,e2.bandera as bandera2, e1.nombre as nombre1, e1.idequipo as idequipo1, e2.nombre as nombre2, e2.idequipo as idequipo2, pa.gequipo1, pa.gequipo2, pa.fecha, pa.hora, f.fase, f.idfase, es.nombre as estadio, es.idestadio from partidos pa, Equipos e1, Equipos e2, Fases f, Estadios es Where (pa.idEquipo1 = e1.idEquipo) AND (pa.idEquipo2 = e2.idEquipo) AND (f.idFase = pa.idFase) AND (es.idEstadio = pa.idEstadio)`);
    res.json(resp.rows);
}

const getPartidosById = async (req, res)=>{
    const { id } = req.params;
    const resp = await pool.query(`select pa.idPartido,e1.bandera as bandera1,e2.bandera as bandera2, e1.nombre as nombre1, e1.idequipo as idequipo1, e2.nombre as nombre2, e2.idequipo as idequipo2, pa.gequipo1, pa.gequipo2, pa.fecha, pa.hora, f.fase, f.idfase, es.nombre as estadio, es.idestadio from partidos pa, Equipos e1, Equipos e2, Fases f, Estadios es Where (pa.idEquipo1 = e1.idEquipo) AND (pa.idEquipo2 = e2.idEquipo) AND (f.idFase = pa.idFase) AND (es.idEstadio = pa.idEstadio) AND pa.idPartido = ${id}`);
    res.json(resp.rows[0]);
}

const getPartidosByTeamId = async(req, res)=>{
    const { id } = req.params;
    const exists = await pool.query(`SELECT idEquipo FROM Equipos WHERE idEquipo = ${ id };`);
    if ( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'El id del equipo es incorrecto'
        });
    }
    const resp = await pool.query(`select pa.idPartido,e1.bandera as bandera1,e2.bandera as bandera2, e1.nombre as nombre1, e1.idequipo as idequipo1, e2.nombre as nombre2, e2.idequipo as idequipo2, pa.gequipo1, pa.gequipo2, pa.fecha, pa.hora, f.fase, f.idfase, es.nombre as estadio, es.idestadio from partidos pa, Equipos e1, Equipos e2, Fases f, Estadios es Where (pa.idEquipo1 = e1.idEquipo) AND (pa.idEquipo2 = e2.idEquipo) AND (f.idFase = pa.idFase) AND (es.idEstadio = pa.idEstadio) AND ((pa.idEquipo1 = ${id})OR(pa.idEquipo2 = ${id}));`);
    res.json(resp.rows);
}

const getPartidosByFaseId  = async(req,res)=>{
    const { id } = req.params;

    const exists = await pool.query(`SELECT idFase FROM Fases WHERE idFase = ${id} `);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'La id de la Fase no existe'
        });
    }
    const resp = await pool.query(`select pa.idPartido,e1.bandera as bandera1,e2.bandera as bandera2, e1.nombre as nombre1, e1.idequipo as idequipo1, e2.nombre as nombre2, e2.idequipo as idequipo2, pa.gequipo1, pa.gequipo2, pa.fecha, pa.hora, f.fase, f.idfase, es.nombre as estadio, es.idestadio from partidos pa, Equipos e1, Equipos e2, Fases f, Estadios es Where (pa.idEquipo1 = e1.idEquipo) AND (pa.idEquipo2 = e2.idEquipo) AND (f.idFase = pa.idFase) AND (es.idEstadio = pa.idEstadio) AND (pa.idFase = ${id})`);
    res.json(resp.rows);
}

const getPartidosByDate = async (req, res)=>{
    const { date } = req.body
    const resp = await pool.query(`select pa.idPartido,e1.bandera as bandera1,e2.bandera as bandera2, e1.nombre as nombre1, e1.idequipo as idequipo1, e2.nombre as nombre2, e2.idequipo as idequipo2, pa.gequipo1, pa.gequipo2, pa.fecha, pa.hora, f.fase, f.idfase, es.nombre as estadio, es.idestadio from partidos pa, Equipos e1, Equipos e2, Fases f, Estadios es Where (pa.idEquipo1 = e1.idEquipo) AND (pa.idEquipo2 = e2.idEquipo) AND (f.idFase = pa.idFase) AND (es.idEstadio = pa.idEstadio) AND (pa.fecha = ${ date })`);
    res.json(resp.rows);
}

const getPartidosByGrupo = async(req,res)=>{
    const { grupo } = req.body;
    const resp = await pool.query(`select pa.idPartido,e1.bandera as bandera1,e2.bandera as bandera2, e1.nombre as nombre1, e1.idequipo as idequipo1, e2.nombre as nombre2, e2.idequipo as idequipo2, pa.gequipo1, pa.gequipo2, pa.fecha, pa.hora, f.fase, f.idfase, es.nombre as estadio, es.idestadio from partidos pa, Equipos e1, Equipos e2, Fases f, Estadios es Where (pa.idEquipo1 = e1.idEquipo) AND (pa.idEquipo2 = e2.idEquipo) AND (f.idFase = pa.idFase) AND (es.idEstadio = pa.idEstadio) AND ((e1.grupo = '${grupo}') OR (e2.grupo = '${grupo}'))`);
    res.json(resp.rows);
}

const postPartido = async(req, res)=>{
    const { idequipo1, idequipo2, fecha, hora, idfase,  idestadio }  = req.body
    //que el equipo 1 y 2 no sean el mismo
    if (idequipo1 == idequipo2){
        return res.status(400).json({
            msg: 'Un equipo no puede enfrentarse a si mismo'
        });
    }

    //que la fase exista
    const faseExists = await pool.query(`SELECT idFase FROM Fases WHERE idFase = ${idfase}`);
    if ( faseExists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'la fase no existe en la base de datos'
        });
    }

    //que el estadio exista
    const estadioExits = await pool.query(`SELECT idEstadio FROM Estadios WHERE idEstadio = ${idestadio}`);
    if ( estadioExits.rowCount == 0 ){
        return res.status(400).json({
            msg: 'el estadio no existe en la base de datos'
        });
    }

    //ingresar los datos de un partido
    await pool.query(`INSERT INTO public.partidos(idequipo1, idequipo2, gequipo1, gequipo2, fecha, hora, idfase, idestadio) VALUES ( ${idequipo1}, ${idequipo1} , 0, 0, '${fecha}', '${hora}', ${idfase}, ${idestadio});`);
    res.json({
        msg: 'Partido agregado con exito'
    });
}

const putPartidosById = async(req, res)=>{
    const { id } = req.params;
    const { idequipo1, idequipo2, golesE1, golesE2, fecha, hora, idfase,  idestadio }  = req.body

    //que exista el equipo 1
    const exists1 = await pool.query(`SELECT idEquipo FROM Equipos WHERE idEquipo = ${idequipo1}`);
    if ( exists1.rowCount == 0 ){
        return res.status(400).json({
            msg: 'el equipo numero uno no existe en la base de datos'
        });
    }
    //que exista el equipo 2
    const exists2 = await pool.query(`SELECT idEquipo FROM Equipos WHERE idEquipo = ${idequipo2}`);
    if ( exists2.rowCount == 0 ){
        return res.status(400).json({
            msg: 'el equipo numero dos no existe en la base de datos'
        });
    }

    //que el equipo 1 y 2 no sean el mismo
    if (idequipo1 == idequipo2){
        return res.status(400).json({
            msg: 'Un equipo no puede enfrentarse a si mismo'
        });
    }

    //que la fase exista
    const faseExists = await pool.query(`SELECT idFase FROM Fases WHERE idFase = ${idfase}`);
    if ( faseExists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'la fase no existe en la base de datos'
        });
    }

    //que el estadio exista
    const estadioExits = await pool.query(`SELECT idEstadio FROM Estadios WHERE idEstadio = ${idestadio}`);
    if ( estadioExits.rowCount == 0 ){
        return res.status(400).json({
            msg: 'el estadio no existe en la base de datos'
        });
    }

    //actualizar los datos del partido en base al id
    const resp = await pool.query(`UPDATE public.partidos SET idequipo1=${idequipo1}, idequipo2=${idequipo2}, gequipo1=${golesE1}, gequipo2=${golesE2}, fecha=${fecha}, hora=${hora}, idfase=${idfase}, idestadio=${idestadio} WHERE idpartido =${id} ;`) ;
    console.log('respuesta de la base de datos al actualizar un Partido' + resp);
    res.json({
        msg: 'Se actualizo el Partido con exito'
    });
}
const deletePartido = async(req, res) =>{

    const { id } = req.params;
    //comprabar que no se encuentre relacionado a alguna quiniela
    const exists = await pool.query(`SELECT idQuiniela FROM Quinielas WHERE idQuiniela = ${ id }`);
    if ( exists.rowCount != 0 ){
        return res.status(400).json({
            msg: 'El partido esta relacionado a alguna quiniela'
        });
    }

    const resp = await pool.query(`DELETE FROM Quinielas WHERE idQuiniela = ${ id }`);
    res.json({
        msg: 'Partido Eliminado con exito'
    });
}

module.exports = {
    getPartidos,
    getPartidosByDate,
    getPartidosByFaseId,
    getPartidosByGrupo,
    getPartidosByTeamId,
    postPartido,
    putPartidosById,
    deletePartido,
    getPartidosById
}