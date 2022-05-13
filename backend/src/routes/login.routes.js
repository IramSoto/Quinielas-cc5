// de expres importamos Router que nos permite crear rutas dentro de la aplicacion de servidor

const { Router } = require('express');
const { check } = require('express-validator');
const loginCtrl = require('../controllers/login.controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',[
    check('username', 'El username es un campo obligatorio').not().isEmpty(),
    check('password', 'La Contraseña es obligatoria').not().isEmpty(),
    validarCampos
] , loginCtrl.login);

module.exports = router;

