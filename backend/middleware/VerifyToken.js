const jwt  = require("jsonwebtoken");
const Errorhandler = require("./Error");

const VerifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) return next(Errorhandler(401, 'Unauthorized'));
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(Errorhandler(403, 'Forbidden'));
  
      req.user = user;
      next();
    });
  };

module.exports = VerifyToken;