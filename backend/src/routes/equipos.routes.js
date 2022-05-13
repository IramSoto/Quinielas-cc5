const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { hasRole, isAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validarjwt');
const equiposCtrl = require('../controllers/equipos.controllers');

const router = Router();

//obtener todos los equipos
router.get('/', [
    validarJWT,
    hasRole('A', 'C'),
    validarCampos
],equiposCtrl.getEquipos);

router.post('/Grupo/', [
    validarJWT,
    hasRole('A', 'C'),
    check('grupo', 'el grupo del Equipo es obligatorio').not().isEmpty(),
    validarCampos
], equiposCtrl.getEquipoByTeam);

//obtener un equipo por su id
router.get('/:id', [
    validarJWT,
    hasRole('A', 'C'),
    check('id', 'El id del Equipo es obligatorio').not().isEmpty(),
    validarCampos
], equiposCtrl.getEquipoById);
//ingresar un nuevo Equipo
router.post('/',[
    validarJWT,
    isAdminRole,
    check('nombre','El nombre es obligaotrio').not().isEmpty(),
    check('bandera','La bandera es un campo obligatorio').not().isEmpty(),
    check('grupo','EL grupo para un equipo es obligatorio').not().isEmpty(),
    validarCampos
],equiposCtrl.postEquipo);
//eliminar un Equipo por su id
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id','El id es un campo obligatorio').not().isEmpty(),
    validarCampos
],equiposCtrl.deleteEquipo);
//actualizar un equipo por su id
router.put('/:id',[
    validarJWT,
    isAdminRole,
    check('nombre','El nombre es obligaotrio').not().isEmpty(),
    check('bandera','La bandera es un campo obligatorio').not().isEmpty(),
    check('grupo','EL grupo para un equipo es obligatorio').not().isEmpty(),
    check('pg','pg Es un campo obligatorio').not().isEmpty(),
    check('pp','pp es un campo obligatorio').not().isEmpty(),
    check('pe','pe es un campo obligatorio').not().isEmpty(),
    check('ga','ga es un campo obligatorio').not().isEmpty(),
    check('ge','ge es un campo obligatorio').not().isEmpty(),
    validarCampos
],equiposCtrl.putEquipo);
module.exports = router;