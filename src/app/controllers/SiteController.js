const Song = require('../models/Song.js');

class SiteController {

    // [GET] /song
    showHome (req, res, next) {
        Song.find({}).lean()
            .then((songs) => {
                res.clearCookie('userId');
                res.render('home', {songs});
                return;
            })
            .catch(next)
    }
}

module.exports = new SiteController;