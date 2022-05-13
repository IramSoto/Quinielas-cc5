const isAdminRole = (req, res, next)=>{

    if( !req.aUser ){
        return res.status(500).json({
            msg: 'se quiere validar el role sin validar token primero'
        })
    }
    const {tipo} = req.aUser[0];
    if ( tipo != 'A'){
        return res.status(401).json({
            msg: 'El usuario no es administrador'
        }); 
    }
    next();
}
const hasRole = (...roles) =>{
    return (req, res ,next)=>{
        if( !req.aUser ){
            return res.status(500).json({
                msg: ' se quiere validar el role sin validar token primero'
            })
        }
        if(!roles.includes(req.aUser[0].tipo)){
            return res.status(401).json({
                msg: 'El Servicio requiere de otro rol para ejecutarse'
            });
        }
        next();
    }
}


module.exports = {
    isAdminRole,
    hasRole
}