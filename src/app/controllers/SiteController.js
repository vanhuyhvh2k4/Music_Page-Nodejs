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
        res.render('users/signup')
    }

    // [POST] /signup/store
    store (req, res, next) {
        User.create(req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new SiteController;