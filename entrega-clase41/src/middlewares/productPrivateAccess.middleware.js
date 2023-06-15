function productPrivateAccess (req, res, next){
    const userRole = req.session.user.role
    if(userRole !== 'admin') return res.json({msg: "ingreso no autorizado"})
    next()
}   

export default productPrivateAccess    