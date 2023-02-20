const Song = require('../models/Song.js');
const User = require('../models/User.js');

class SiteController {

    // [GET] /
    showHome (req, res, next) {

        var SongQuery = Song.find({ deleted: false}).lean()
        var UserQuery = User.findOne({ _id: req.cookies.loginId}).lean()

        Promise.all([SongQuery, UserQuery])
            .then(([songs, user]) => 
                res.render('home', {songs, user})
            )
            .catch(next)

        res.clearCookie('userId');
    }

    // [GET] /signup
    showSignup (req, res, next) {
        res.clearCookie("loginId");
        res.render('users/signup', {type: req.flash('type'), intro: req.flash('intro'), message: req.flash('message')});
    }

    // [POST] /signup/store
    store (req, res, next) {
        if (req.body.password != req.body.repeatPassword) {
            req.flash('type', 'danger');
            req.flash('intro', 'Register Failed !  ');
            req.flash('message', 'Again password don\'t correct. Please try again!');
            res.redirect('/signup');
        }
        else{
            User.create(req.body)
                .then(() => {
                    req.flash('type', 'success');
                    req.flash('intro', 'Register Successfully !  ');
                    req.flash('message', 'Account had created. Please Login !');
                    res.redirect('/signup');
                })
                .catch(next)
        }
    }

    // [GET] /login
    showLogin (req, res, next) {
        res.clearCookie("loginId");
        res.render('users/login', { message: req.flash('message'), intro: req.flash('intro')});
    }

    // [POST] /login
    login (req, res, next) {

        User.findOne({ email: req.body.email, password: req.body.password}, function (err, user) {
            if (user) {
                res.cookie('loginId', user._id)
                res.redirect('/')
            }
            else {
                req.flash('intro', 'Login Failed !  ');
                req.flash('message', 'Email or Password don\'t correct. Please try again!');
                res.redirect('/login');
            }
        })
    }
}

module.exports = new SiteController;