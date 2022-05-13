const pool = require("../database/database.connection");

const getFases = async(req, res)=>{
    const resp = await pool.query(`SELECT * FROM Fases`);
    res.json(resp.rows);
}

const getFaseById = async(req, res)=>{
    const { id } = req.params;
    
    const exists = await pool.query(`SELECT * FROM Fases WHERE idFase = ${id}`);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'La Fase no existe en la base de datos'
        });
    } 
    res.json(exists.rows);
}

const postFase = async (req, res)=>{
    const { fase } = req.body;
    const exists = await pool.query(`SELECT * FROM Fases WHERE fase = ${fase}`);
    if( exists.rowCount != 0 ){
        return res.status(400).json({
            msg: 'La fase ya existe en la base de datos'
        });
    } 
    const resp = await pool.query(`INSERT INTO Fases(fase, finalizado) VALUES (${fase},FALSE)`);
    res.json({
        msg: 'la Fase se agrego con exito'
    });
}

const putFase = async(req,res)=>{
    const { id } = req.params;
    const { finalizado } = req.body;

    const exists = await pool.query(`SELECT * FROM Fases WHERE idFase = ${id}`);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'La Fase no existe en la base de datos'
        });
    } 

    const cantP = await pool.query(`SELECT count(*) FROM Equipos`);
    //&& cantP.rows[0].count >= 56
    if( finalizado == 'TRUE' && cantP.rows[0].count >= 64){
        if(id == 1 ){
            const grupoA = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'A' order by puntos desc, dif desc limit 2`);
            const grupoB = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'B' order by puntos desc, dif desc limit 2`);
            const grupoC = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'C' order by puntos desc, dif desc limit 2`);
            const grupoD = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'D' order by puntos desc, dif desc limit 2`);
            const grupoE = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'E' order by puntos desc, dif desc limit 2`);
            const grupoF = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'F' order by puntos desc, dif desc limit 2`);
            const grupoG = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'G' order by puntos desc, dif desc limit 2`);
            const grupoH = await pool.query(`SELECT idEquipo, ((pg*3) + pe) as puntos, (ga - ge) AS dif FROM Equipos where grupo = 'H' order by puntos desc, dif desc limit 2`);
            //console.log(grupoA.rows)
            await pool.query(`Update Partidos SET idequipo1 = ${grupoA.rows[0].idequipo}, idequipo2 = ${grupoB.rows[1].idequipo} WHERE idpartido = 49`);
            await pool.query(`Update Partidos SET idequipo1 = ${grupoC.rows[0].idequipo}, idequipo2 = ${grupoD.rows[1].idequipo} WHERE idpartido = 50`);
            await pool.query(`Update Partidos SET idequipo1 = ${grupoD.rows[0].idequipo}, idequipo2 = ${grupoC.rows[1].idequipo} WHERE idpartido = 51`);
            await pool.query(`Update Partidos SET idequipo1 = ${grupoB.rows[0].idequipo}, idequipo2 = ${grupoA.rows[1].idequipo} WHERE idpartido = 52`);
            await pool.query(`Update Partidos SET idequipo1 = ${grupoE.rows[0].idequipo}, idequipo2 = ${grupoF.rows[1].idequipo} WHERE idpartido = 53`);
            await pool.query(`Update Partidos SET idequipo1 = ${grupoG.rows[0].idequipo}, idequipo2 = ${grupoH.rows[1].idequipo} WHERE idpartido = 54`);
            await pool.query(`Update Partidos SET idequipo1 = ${grupoF.rows[0].idequipo}, idequipo2 = ${grupoE.rows[1].idequipo} WHERE idpartido = 55`);
            await pool.query(`Update Partidos SET idequipo1 = ${grupoH.rows[0].idequipo}, idequipo2 = ${grupoG.rows[1].idequipo} WHERE idpartido = 56`);


        }else if( id == 2 ){
            const w49 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 49`);
            const w50 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 50`);
            const w51 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 51`);
            const w52 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 52`);
            const w53 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 53`);
            const w54 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 54`);
            const w55 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 55`);
            const w56 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 56`);
            
            await pool.query(`Update Partidos SET idequipo1 = ${w53.rows[0].idequipo}, idequipo2 = ${w54.rows[0].idequipo} WHERE idpartido = 57`);
            await pool.query(`Update Partidos SET idequipo1 = ${w49.rows[0].idequipo}, idequipo2 = ${w50.rows[0].idequipo} WHERE idpartido = 58`);
            await pool.query(`Update Partidos SET idequipo1 = ${w51.rows[0].idequipo}, idequipo2 = ${w52.rows[0].idequipo} WHERE idpartido = 59`);
            await pool.query(`Update Partidos SET idequipo1 = ${w55.rows[0].idequipo}, idequipo2 = ${w56.rows[0].idequipo} WHERE idpartido = 60`);

        }else if(id == 3){
            const w57 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 57`);
            const w58 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 58`);
            const w59 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 59`);
            const w60 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 60`);
            await pool.query(`Update Partidos SET idequipo1 = ${w57.rows[0].idequipo}, idequipo2 = ${w58.rows[0].idequipo} WHERE idpartido = 61`);
            await pool.query(`Update Partidos SET idequipo1 = ${w59.rows[0].idequipo}, idequipo2 = ${w60.rows[0].idequipo} WHERE idpartido = 62`);
            
        
        }else if( id == 4){
            const w61 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 61`);
            const w62 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo1 when gequipo1 < gequipo2 then idEquipo2 end idequipo FROM Partidos WHERE idPArtido = 62`);
            const p61 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo2 when gequipo1 < gequipo2 then idEquipo1 end idequipo FROM Partidos WHERE idPArtido = 61`);
            const p62 = await pool.query(`Select case when gequipo1 > gequipo2 then idEquipo2 when gequipo1 < gequipo2 then idEquipo1 end idequipo FROM Partidos WHERE idPArtido = 62`);
            await pool.query(`Update Partidos SET idequipo1 = ${p61.rows[0].idequipo}, idequipo2 = ${p62.rows[0].idequipo} WHERE idpartido = 63`);
            await pool.query(`Update Partidos SET idequipo1 = ${w61.rows[0].idequipo}, idequipo2 = ${w62.rows[0].idequipo} WHERE idpartido = 64`);
        }
    }else{
        return res.status(400).json({
            msg: 'aun no hay los suficientes partidos para cambiar de fase'
        });
    }
    const resp = await pool.query(`UPDATE Fases SET finalizado = ${finalizado} WHERE idFase = ${id};`);
    res.json({
        msg: 'Fase actualizada de forma exitosa'
    });
}

const deleteFase = async(req, res)=>{
    const { id } =  req.paramas;

    const exists = await pool.query(`SELECT * FROM Fases WHERE idFase = ${id}`);
    if( exists.rowCount == 0 ){
        return res.status(400).json({
            msg: 'La Fase no existe en la base de datos'
        });
    }

    const related = await pool.query(`SELECT * FROM Partidos WHERE idFase = ${ id };`);
    if( related.rowCount !=0 ){
        return res.status(400).json({
            msg: 'La fase se encuentra relaciona con otras tablas'
        });
    }

    const resp = await pool.query(`DELETE FROM Fases WHERE idFase = ${id}`);
    res.json({
        msg: 'La fase se elimino de la base de datos'
    })
}



module.exports = {
    getFases,
    getFaseById,
    postFase,
    putFase,
    deleteFase
}