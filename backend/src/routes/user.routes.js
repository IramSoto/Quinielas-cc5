const { Router } = require('express');
const userCtrl = require('../controllers/user.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { hasRole, isAdminRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarjwt');

const router = Router();
//nuevo usuario
router.post('/', userCtrl.newUser);

//ver lista de usuarios clientes
router.get('/', [
    validarJWT,
    hasRole('A','C'),
    validarCampos
] ,userCtrl.viewUsers);

//eliminar un usuario
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'el id es obligatorio'),
    validarCampos
],userCtrl.deleteUser);

//actualizar un usuario
router.put('/:id', [
    validarJWT,
    hasRole('A', 'C'),
    check('id', 'El id es obligatorio'),
    validarCampos
], userCtrl.updateUser);

//obtener un usuario por id
router.get('/:id', [ 
    validarJWT,
    hasRole('A', 'C'),
    check('id', 'El id es obligatorio'),
    validarCampos
], userCtrl.viewUserById);

module.exports = router;