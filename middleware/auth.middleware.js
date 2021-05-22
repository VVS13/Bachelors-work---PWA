
const jwt = require('jsonwebtoken')

const config = require('config')

module.exports = (req, res, next) => {  //next allows request to continue 
    if (req.method === 'OPTIONS') {// OPTIONS = method in rest api that check if server is available
        return next() //continues request - used instead of else for cleaner code
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // (bearer token)

        if (!token){
            res.status(401).json({message:'Not authorized'})
        }

        //if token exists, need to decode it 
        const decoded = jwt.verify(token,config.get('jwtSecretKey'))
        req.user = decoded
        next()

    }catch(e){
        res.status(401).json({message:'Not authorized'})
    }

}