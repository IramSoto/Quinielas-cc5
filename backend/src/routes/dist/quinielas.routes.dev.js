"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var _require3 = require('../middlewares/validar-campos'),
    validarCampos = _require3.validarCampos;

var _require4 = require('../middlewares/validar-roles'),
    hasRole = _require4.hasRole,
    isAdminRole = _require4.isAdminRole;

var _require5 = require('../middlewares/validarjwt'),
    validarJWT = _require5.validarJWT;

var Ctrl = require('../controllers/quinielas.controllers');

var router = Router();
router.get('/', [validarJWT, hasRole('A', 'C'), validarCampos], Ctrl.getQuinielas);
router.get('/UserPartido', [validarJWT, hasRole('A', 'C'), check('idUsuario', 'Es un campo obligatorio'), check('idPartido', 'El Id del Partido es obligatorio'), validarCampos], Ctrl.getQuiniela);
router.get('/User/:id', [validarJWT, hasRole('A', 'C'), check('id', 'Es un campo obligatorio'), validarCampos], Ctrl.getQuinielasByUser);
router.get('/Partido/:id', [validarJWT, hasRole('A', 'C'), check('id', 'Es un campo obligatorio'), validarCampos], Ctrl.getQuinielasByPartido);
router["delete"]('/', [validarJWT, isAdminRole, check('idUsuario', 'Es un campo obligatorio'), check('idPartido', 'El Id del Partido es obligatorio'), validarCampos], Ctrl.deleteQuinielaQuiniela);
router["delete"]('/User/:id', [validarJWT, isAdminRole, check('id', 'Es un campo obligatorio'), validarCampos], Ctrl.getQuinielasByUser);
router["delete"]('/Partido/:id', [validarJWT, isAdminRole, check('id', 'Es un campo obligatorio'), validarCampos], Ctrl.getQuinielasByPartido);
router.put('/', [validarJWT, isAdminRole, check('id', 'Es un campo obligatorio'), validarCampos], Ctrl.getQuiniela);