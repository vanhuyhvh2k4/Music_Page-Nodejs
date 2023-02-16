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

    // [GET] /song/:slug
    showDetail (req, res, next) {
        Song.findOne({ slug: req.params.slug}).lean()
            .then((song) => res.render('songDetail', {
                song,
            }))
            .catch(next)
    }
}

module.exports = new SiteController;