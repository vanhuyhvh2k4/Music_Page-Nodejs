const Auth = require('../app/models/Auth.js');
const User = require('../app/models/User.js');

module.exports.requireAuth = function (req, res, next) {
    if (!req.cookies.userId) {
        res.redirect('/admin');
        return;
    }

    Auth.findOne({ _id: req.cookies.userId}, function (err, auth) {
         var user = auth._id;
         if (!user) {
             res.redirect('/admin');
             return;
          }
          else {
            next();
          }
    })
};

module.exports.requireLogin = function (req, res, next) {
    if (!req.cookies.loginId) {
        res.redirect('/login');
        return;
    }

    User.findOne({ _id: req.cookies.loginId}, function (err, auth) {
         var user = auth._id;
         if (!user) {
             res.redirect('/login');
             return;
          }
          else {
            next();
          }
    })
};

