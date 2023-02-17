const Song = require('../models/Song.js');

class SongDetailController {

    // [GET] /song/:slug
    showDetail (req, res, next) {
        Song.findOne({ name: req.params.slug}).lean()
            .then((song) => res.render('songDetail', {
                song,
            }))
            .catch(next)
    }
}

module.exports = new SongDetailController;