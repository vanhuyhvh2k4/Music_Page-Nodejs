const Auth = require('../models/Auth.js');
const md5 = require('md5');

class AuthController {

    // [GET] /admin
    show (req, res, next) {
        res.render('auth/authLogin', {intro: req.flash('intro'), message: req.flash('message')});
    }

    // [POST] /admin
    login (req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        var hashPassword = md5(password);
        Auth.findOne({ email: email, password : hashPassword}, function (err,  auth) {
            var user = auth;

            if (!auth) {
                req.flash('intro', 'Login Failed');
                req.flash('message', 'Email or Password don\'t correct. Please try again!');
                res.redirect('/admin');
            }
            else {
                res.cookie('userId', user._id)
                res.redirect('/myadmin');
            }
        })

    }
}

module.exports = new AuthController;