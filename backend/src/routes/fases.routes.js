const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { hasRole, isAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validarjwt');
const fasesCtrl  = require('../controllers/fases.controllers');

const router = Router();

router.get('/',[
    validarJWT,
    hasRole('A','C'),
    validarCampos
],fasesCtrl.getFases);

router.get('/:id',[
    validarJWT,
    hasRole('A','C'),
    check('id', 'id es un campo obligatorio'),
    validarCampos
],fasesCtrl.getFaseById);

router.post('/',[
    validarJWT,
    isAdminRole,
    check('fase', 'fase es un campo obligatorio'),
    validarCampos
],fasesCtrl.postFase);

router.put('/:id',[
    validarJWT,
    isAdminRole,
    check('finalizado', 'finalizado es un campo obligatorio'),
    validarCampos
],fasesCtrl.putFase);

router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'id es un campo obligatorio'),
    validarCampos
],fasesCtrl.deleteFase)

module.exports = router;