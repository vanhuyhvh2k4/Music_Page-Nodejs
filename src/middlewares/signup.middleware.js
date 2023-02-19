var User = require('../app/models/User.js');

var authMethods = {};

authMethods.isInUse = function(req,res,next){
  User.findOne({"email" : req.body.email}, (err,user) => {
    if(user){
      res.send("This mail is already in use.");
    }else {
      return next();
    }
  });
}

module.exports = authMethods;