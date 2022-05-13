const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { hasRole, isAdminRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validarjwt');
const estadiCtrl = require('../controllers/estadio.controllers');

const router = Router();

//obtener todos los estadios en la base de datos
router.get('/',[
    validarJWT,
    hasRole('A','C'),
    validarCampos
],estadiCtrl.viewAllEstadios);

//obtener un estadio en especifico
router.get('/:id',[
    validarJWT, 
    hasRole('A','C'),
    validarCampos
],estadiCtrl.viewEstadio);

//insetar un nuevo estadio
router.post('/',[
    validarJWT,
    isAdminRole,
    check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
    validarCampos
],estadiCtrl.newEstadio);

//eliminar un estadio
router.delete('/:id',[
    validarJWT,
    isAdminRole,
    check('id', 'Es obligatorio enviar el id').not().isEmpty(),
    validarCampos
], estadiCtrl.deleteEstadio);

//actualizar un estadio
router.put('/:id',[
    validarJWT,
    isAdminRole,
    check('nombre', 'Se debe ingresal el nuevo nombre').not().isEmpty(),
    validarCampos
], estadiCtrl.updateEstadio);


module.exports = router;
