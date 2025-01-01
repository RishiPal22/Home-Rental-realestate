const Errorhandler = require("./Error");
const jwt = require('jsonwebtoken')
require('dotenv').config();

const VerifyToken = (req, res, next) => {
 
    const token = req.cookies.access_token;
    console.log("Token:", token);
    console.log("Token from cookies:", req.cookies.access_token);
    console.log("Token from Authorization header:", req.headers.authorization);
    
  
    if (!token) return next(Errorhandler(401, 'Unauthorized'));
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(Errorhandler(403, 'Forbidden'));
  
      req.user = user;
      next();
    });
  };

module.exports = VerifyToken;