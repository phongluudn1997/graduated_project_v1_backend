const jwt = require('jsonwebtoken')
const jwt_constant = require('../constants/JWT');
const message = require('../constants/message')

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, jwt_constant.JWT_SECRET_KEY);
        req.decoded = decoded;
        next();
    } catch(error){
        let err = new Error();
        err.message = message.TOKEN_FAIL;
        next(err) 
    }
}