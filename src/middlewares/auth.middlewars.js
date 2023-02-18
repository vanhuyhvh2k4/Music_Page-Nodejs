const Auth = require('../app/models/Auth.js');

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
