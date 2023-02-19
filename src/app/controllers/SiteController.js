const Song = require('../models/Song.js');
const User = require('../models/User.js');

class SiteController {

    // [GET] /song
    showHome (req, res, next) {
        Song.find({ deleted: false}).lean()
            .then((songs) => {
                res.clearCookie('userId');
                res.render('home', {songs});
                return;
            })
            .catch(next)
    }

    // [GET] /signup
    showSignup (req, res, next) {
        res.clearCookie("loginId");
        res.render('users/signup');
    }

    // [POST] /signup/store
    store (req, res, next) {
        if (req.body.password != req.body.repeatPassword) {
            res.send('again password don\'t correct. Please enter again')
        }

        User.create(req.body)
            .then(() => res.redirect('/login'))
            .catch(next)
    }

    // [GET] /login
    showLogin (req, res, next) {
        res.clearCookie("loginId");
        res.render('users/login');
    }

    // [POST] /login
    login (req, res, next) {
        User.findOne({ email: req.body.email, password: req.body.password}, function (err, user) {
            if (user) {
                res.cookie('loginId', user._id)
                res.redirect('/')
            }
            else {
                res.send('fail')
            }
        })
    }
}

module.exports = new SiteController;