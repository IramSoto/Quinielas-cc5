const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { hasRole, isAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validarjwt');
const Ctrl = require('../controllers/quinielas.controllers');

const router = Router();

router.get('/',[
    validarJWT,
    hasRole('A','C'),
    validarCampos
],Ctrl.getQuinielas);

router.post('/UserPartido', [
    validarJWT,
    hasRole('A','C'),
    check('idUsuario', 'Es un campo obligatorio'),
    check('idPartido', 'El Id del Partido es obligatorio'),
    validarCampos
], Ctrl.getQuiniela);

router.get('/User/:id', [
    validarJWT,
    hasRole('A','C'),
    check('id', 'Es un campo obligatorio'),
    validarCampos
], Ctrl.getQuinielasByUser);

router.get('/Partido/:id', [
    validarJWT,
    hasRole('A','C'),
    check('id', 'Es un campo obligatorio'),
    validarCampos
], Ctrl.getQuinielasByPartido);

router.delete('/',[
    validarJWT,
    isAdminRole,
    check('idUsuario', 'Es un campo obligatorio'),
    check('idPartido', 'El Id del Partido es obligatorio'),
    validarCampos
], Ctrl.deleteQuiniela);

router.delete('/User/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'Es un campo obligatorio'),
    validarCampos
], Ctrl.deleteQuinielaByUser);

router.delete('/Partido/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'Es un campo obligatorio'),
    validarCampos
], Ctrl.deleteQuinielaByPartido);

router.put('/', [
    validarJWT,
    hasRole('A','C'),
    check('idUsuario', 'Es un campo obligatorio'),
    check('idPartido', 'El Id del Partido es obligatorio'),
    check('mEquipo1', 'Es un campo obligatorio'),
    check('mEquipo2', 'Es un campo obligatorio'),
    validarCampos
], Ctrl.putQuiniela);

router.post('/', [
    validarJWT,
    hasRole('A','C'),
    check('idUsuario', 'Es un campo obligatorio'),
    check('idPartido', 'El Id del Partido es obligatorio'),
    check('mEquipo1', 'Es un campo obligatorio'),
    check('mEquipo2', 'Es un campo obligatorio'),
    validarCampos
], Ctrl.postQuinielas);


module.exports = router;