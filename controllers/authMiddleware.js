const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Access Denied. No token available!' });
    }
    const token = authHeader.split(' ')[1];  
    try {
        const decoded = jwt.verify(token, 'secretKey');
        console.log(decoded);
        req.user = await User.findById(decoded.id).select('-password')
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Access Denied. Invalid token!' });
    }
};
const Admin=async(req,res,next)=>{
    if(req.user&& req.user.Admin){
        next()
    }else{
        res.status(401);
        throw new Error("Not an authorized admin");
        
    }
}

module.exports = authMiddleware,Admin;