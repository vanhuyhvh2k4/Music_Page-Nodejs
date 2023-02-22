const Song = require('../models/Song.js');
const User = require('../models/User.js');

class SiteController {

    // [GET] /
    showHome (req, res, next) {

        var page = parseInt(req.query.page) || 1; //n
        var perPage = 8; //x
        var start = (page - 1) * perPage;
        var end = page * perPage;
        var SongQuery = Song.find({ deleted: false}).lean()
        var UserQuery = User.findOne({ _id: req.cookies.loginId}).lean()
        var countNumber =  Song.countDocuments();

        Promise.all([SongQuery, UserQuery, countNumber])
            .then(([songs, user, number]) => {
                var pageNumber;

                if (number%perPage == 0) {
                    pageNumber = number / perPage;
                }
                else {
                    pageNumber = parseInt((number / perPage) + 1);
                }
                songs = songs.slice(start, end);
                res.render('home', {songs, user, pageNumber})
            } 
            )
            .catch(next)

        res.clearCookie('userId');
    }

    // [GET] /signup
    showSignup (req, res, next) {
        res.clearCookie('loginId');
        res.clearCookie('userId');
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
        res.clearCookie('loginId');
        res.clearCookie('userId');
        res.render('users/login', { type: req.flash('type'), message: req.flash('message'), intro: req.flash('intro')});
    }

    // [POST] /login
    login (req, res, next) {

        User.findOne({ email: req.body.email, password: req.body.password}, function (err, user) {
            if (user) {
                res.cookie('loginId', user._id)
                res.redirect('/')
            }
            else {
                req.flash('type', 'danger');
                req.flash('intro', 'Login Failed !  ');
                req.flash('message', 'Email or Password don\'t correct. Please try again!');
                res.redirect('/login');
            }
        })
    }

    // [GET] /forgot
    showForgot (req, res, next) {
        res.render('users/verifyEmail', {intro: req.flash('intro'), message: req.flash('message')});
    }

    // [POST] /forgot
    checkExist (req, res, next) {
        User.findOne({ email: req.body.email}).lean()
            .then((user) => {
                if (user) {
                    res.redirect('/forgot/' + user.email)
                }
                else {
                    req.flash('intro', 'Don\'t found email  ');
                    req.flash('message', 'Please check again!');
                    res.redirect('back');
                }
            })
            .catch(next)
    }

    // [GET] /forgot/:email
    showChange (req, res, next) {
        res.render('users/changePassword', { type: req.flash('type'), intro: req.flash('intro'), message: req.flash('message')});
    }

    // [POST] /forgot/:email
    checkName (req, res, next) {
        User.findOne({ email: req.params.email }).lean()
            .then((user) => {
                if (user.name != req.body.name) {
                    req.flash('type', 'danger');
                    req.flash('intro', 'Verify failed  ');
                    req.flash('message', 'Verify answer is not correct. Please try again');
                    res.redirect('back');
                }
                else {
                    res.cookie('vrfsc', user._id);
                    res.render('users/changePassword', {user});
                }
            })
    }

    // [PATCH] /forgot/:email/update
    update (req, res, next ) {

        if (req.body.password != req.body.confirmPassword) {
            req.flash('type', 'warning');
            req.flash('intro', 'Change Failed  ');
            req.flash('message', 'Confirm password is not correct. Please try again!');
            res.clearCookie('vrfsc');
            res.redirect('back')
        }
        else {
            User.findOneAndUpdate({ email: req.params.email }, { password: req.body.password}).lean()
                .then((user) => {
                    req.flash('type', 'success');
                    req.flash('intro', 'Changed Successfully  ');
                    req.flash('message', 'Your password had changed. Please login!')
                    res.clearCookie('vrfsc');
                    res.redirect('/login');
                })
        }
    }
}

module.exports = new SiteController;