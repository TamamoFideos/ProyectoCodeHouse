
const isAdmin = (req, res, next) => {
    if(process.env.ADMIN==='true'){
        return next();
    }
    res.status(401).json({
        msg: 'User is not admin'
    })
}


module.exports = {
    isAdmin
}