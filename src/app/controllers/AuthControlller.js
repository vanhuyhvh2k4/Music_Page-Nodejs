const Auth = require('../models/Auth.js');
const md5 = require('md5');

class AuthController {

    // [GET] /admin
    show (req, res, next) {
        res.render('auth/authLogin');
    }

    // [POST] /admin
    login (req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        var hashPassword = md5(password);
        Auth.findOne({ email: email, password : hashPassword}, function (err,  auth) {
            var user = auth;

            if (!auth) {
                res.render('auth/authLogin', {
                    // errors: 'Wrong email or password',
                    values: req.body
                });
                return;
            }
            else {
                res.cookie('userId', user._id)
                res.redirect('/myadmin');
            }
        })

    }
}

module.exports = new AuthController;