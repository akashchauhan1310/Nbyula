const jwt = require('jsonwebtoken')

const authenticate = async (req,res,next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {

            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
            req.body.user = decode
            next()
            
        } catch (error) {

            console.log(error)
            res.status(401).json({status : "Failed", message : "Not authorized, token verification failed"})          
        }
    }
    else
    {
        res.status(401).json({status : "Failed", message : "Not authorized, no token"})
    }
}

module.exports = {authenticate}