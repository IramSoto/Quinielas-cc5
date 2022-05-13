const { response, request } = require("express");
const pool = require("../database/database.connection");

const newEstadio = async (req, res) => {
    const { nombre } = req.body;
    try {
        await pool.query(`INSERT INTO Estadios(nombre) VALUES('${nombre}')`);
        res.json({
            msg: "Estadio Guardado exitosamente",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al guardar un estadio en DB",
        });
    }
};
const viewAllEstadios = async (req, res) => {
    try {
        const resp = await pool.query(`SELECT * FROM Estadios`);
        res.json(resp.rows);
    } catch (error) {
        res.status(500).json({
            msg: "Error al mostrar los estadios",
        });
    }
};
const viewEstadio = async (req = request, res = response) => {
    //Ver si el estadio existe
    const { id } = req.params;
    const exists = await pool.query(
        `SELECT idEstadio FROM Estadios WHERE idEstadio = ${id}`
    );
    if (exists.rowCount == 0) {
        return res.status(400).json({
            msg: "El estadio no existe",
        });
    }
    
    const resp = await pool.query(
        `SELECT * FROM Estadios WHERE idEstadio = ${id}`
    );
    res.json(resp.rows[0]);

};
const deleteEstadio = async (req, res) => {
    const { id } = req.params;
    //Ver si el estadio existe
    const exists = await pool.query(
        `SELECT idEstadio FROM Estadios WHERE idEstadio = ${id}`
    );
    if (exists.rowCount == 0) {
        return res.status(400).json({
            msg: "El estadio no existe",
        });
    }
    //validar que no se encuentre en otras tablas para poder eliminarlo
    const related = await pool.query(
        `SELECT idPartido FROM Partidos WHERE idEstadio = ${id}`
    );
    if (related.rowCount > 0) {
        return res.status(400).json({
            msg: "Debe eliminar primero los partidos en donde se encuentra el estadio",
            partidos: related.rows,
        });
    }

    const resp = await pool.query(
        `DELETE FROM public.estadios WHERE idEstadio = ${id}`
    );
    res.json({
        msg: "Estadio eliminado exitosamente",
    });
};
const updateEstadio = async (req, res) => {
    const { id } = req.params;
    //Ver si el estadio existe
    const exists = await pool.query(
        `SELECT idEstadio FROM Estadios WHERE idEstadio = ${id}`
    );
    if (exists.rowCount == 0) {
        return res.status(400).json({
            msg: "El estadio no existe",
        });
    }
    const { nombre } = req.body;
    const resp = await pool.query(
        `UPDATE Estadios SET nombre = '${nombre}' WHERE idEstadio = ${id}`
    );
    res.json({
        msg: "Estadio actualizado exitosamente",
    });
};
module.exports = {
    viewAllEstadios,
    viewEstadio,
    newEstadio,
    deleteEstadio,
    updateEstadio,
};
