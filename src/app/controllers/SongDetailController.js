const Song = require('../models/Song.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

class SongDetailController {

    // [GET] /song/:slug
    showDetail (req, res, next) {
        
        var userId = req.cookies.loginId;
        var songName = req.params.slug;
        var detailSongQuery = Song.findOne({ name: req.params.slug}).lean();
        var moreSongQuery = Song.find({}).lean();
        var commentQuery = Comment.find({ songName: songName }).lean()

        Promise.all([detailSongQuery, moreSongQuery, commentQuery])
            .then(([song, songs, comments]) => {
                // find index of current song
                var index = songs.indexOf(songs.find(song => song.name == req.params.slug));

                songs.splice(index, 1);
                // // display 8 card 
                songs = songs.slice(0, 8);

                res.render('songDetail', {song, songs, comments})
            })
            .catch(next)
    }

    sendComment (req, res, next) {
        var userId = req.cookies.loginId;
        var songName = req.params.slug;
        var userQuery = User.findOne({ _id: req.cookies.loginId }).lean();
        var songQuery = Song.findOne({ name: req.params.slug }).lean();

        Promise.all([userQuery, songQuery])
            .then(([user, song]) => {
                Comment.create({ userId: user._id, userName: user.name, songId: song._id, songName: song.name, content: req.body.comment })
                .then(() => res.redirect('back'))
                .catch(next)
        })

        
    }
}

module.exports = new SongDetailController;