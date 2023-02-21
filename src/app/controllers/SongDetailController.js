const { Promise } = require('mongoose');
const Song = require('../models/Song.js');

class SongDetailController {

    // [GET] /song/:slug
    showDetail (req, res, next) {
        
        Song.find({}).lean()
            .then((songs) => {
                // find index of current song
                var index = songs.indexOf(songs.find(song => song.name == req.params.slug));

                songs.splice(index, 1);
                // display 8 card 
                songs = songs.slice(0, 8);
                Song.findOne({ name: req.params.slug}).lean()
                    .then((song) => res.render('songDetail', {song, songs}))
                    .catch(next)
            })
    }
}

module.exports = new SongDetailController;