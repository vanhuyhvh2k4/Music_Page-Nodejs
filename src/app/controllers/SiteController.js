const Song = require('../models/Song.js');

class SiteController {

    // [GET] /
    show (req, res, next) {
        Song.find({}).lean()
            .then((songs) => res.render('home', {
                songs,
            }))
    }
}

module.exports = new SiteController;