const Song = require('../models/Song.js');

class SiteController {

    // [GET] /song
    showHome (req, res, next) {
        Song.find({}).lean()
            .then((songs) => res.render('home', {
                songs,
            }))
            .catch(next)
    }
}

module.exports = new SiteController;