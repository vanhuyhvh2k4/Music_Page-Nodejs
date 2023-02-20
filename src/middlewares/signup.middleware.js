var User = require('../app/models/User.js');

var authMethods = {};

authMethods.isInUse = function(req,res,next){
  User.findOne({"email" : req.body.email}, (err,user) => {
    if(user){
            req.flash('type', 'danger');
            req.flash('intro', 'Register Failed !  ');
            req.flash('message', 'This email is registered. Please try another email!');
            res.redirect('/signup');
    }else {
      return next();
    }
  });
}

module.exports = authMethods;