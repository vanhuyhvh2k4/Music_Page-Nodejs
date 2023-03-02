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

authMethods.isLocked = function (req, res, next) {
  User.findOneDeleted({ "email": req.body.email }, (err, user) => {
    if (user) {
      req.flash('type', 'warning');
            req.flash('intro', 'Register Failed !  ');
            req.flash('message', 'This email is registered and is locked. Please try another email!');
            res.redirect('/signup');
    }
    else {
      return next();
    }
  }).lean()
}

module.exports = authMethods;