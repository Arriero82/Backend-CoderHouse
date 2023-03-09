function publicAccess (req, res, next){
    if(req.session.user) return res.redirect('/api/profile')
    next()  
}
export default publicAccess 