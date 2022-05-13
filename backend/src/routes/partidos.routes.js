const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { hasRole, isAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validarjwt');
const partidosCtrl =  require('../controllers/partidos.controllers');

const router = Router();

//obtener todos los partidos
router.get('/',[
    validarJWT,
    hasRole('A','C'),
    validarCampos
],partidosCtrl.getPartidos);

//obtener Partidos por dia
router.post('/ByDate',[
    validarJWT,
    hasRole('A','C'),
    check('date', 'La fecha es un campo obligatorio'),
    validarCampos
],partidosCtrl.getPartidosByDate);

//obtener partidos de un equipo
router.get('/ByTeam/:id',[
    validarJWT,
    hasRole('A','C'),
    check('id', 'el id es un campo obligatorio'),
    validarCampos
],partidosCtrl.getPartidosByTeamId);

//obtener partidos por fase
router.get('/ByFase/:id',[
    validarJWT,
    hasRole('A','C'),
    check('id', 'El id de la fase es obligatorio'),
    validarCampos
],partidosCtrl.getPartidosByFaseId);

//obtener Partidos por la fase de grupos
router.post('/ByGroup',[
    validarJWT,
    hasRole('A','C'),
    check('grupo', 'El campo del grupo es obligatorio'),
    validarCampos
],partidosCtrl.getPartidosByGrupo);

//obtener Partido por su id
router.get('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'El id es un campo obligatorio'),
    validarCampos
],partidosCtrl.getPartidosById);

//borrar un Partido
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'El id es un campo obligatorio'),
    validarCampos
],partidosCtrl.deletePartido);

//actualizar un partido
router.put('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'Debe Enviar que partido desea actualizar').not().isEmpty(),
    check('idequipo1','Debe enviar el valor del id del equipo 1').not().isEmpty(),
    check('idequipo2','Debe enviar el valor del id del equipo 2').not().isEmpty(),
    check('golesE1','Debe ingresar los goles del equipo 1').not().isEmpty(),
    check('golesE2', 'Debe ingresar los goles del equipo 2').not().isEmpty(),
    check('fecha', 'Debe ingresar la fecha del partido').not().isEmpty(),
    check('hora', 'Debe ingresar la hora del partido').not().isEmpty(),
    check('finalizado', 'Debe enviar si el partido se ha finalizado').not().isEmpty(),
    check('idfase', 'Debe ingresar el id de la fase del partido').not().isEmpty(),
    check('idestadio', 'Debe ingresar el id del estadio en donde se jugara el partido').not().isEmpty(),
    validarCampos
],partidosCtrl.putPartidosById);

//insertar un nuevo Partido
router.post('/', [
    validarJWT,
    isAdminRole,
    check('fecha', 'Debe ingresar la fecha del partido').not().isEmpty(),
    check('hora', 'Debe ingresar la hora del partido').not().isEmpty(),
    check('idfase', 'Debe ingresar el id de la fase del partido').not().isEmpty(),
    check('idestadio', 'Debe ingresar el id del estadio en donde se jugara el partido').not().isEmpty(),
    validarCampos
], partidosCtrl.postPartido);


module.exports = router;