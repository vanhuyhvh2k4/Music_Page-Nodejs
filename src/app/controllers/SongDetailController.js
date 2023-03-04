const Song = require('../models/Song.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

class SongDetailController {

    // [GET] /song/:slug
    showDetail (req, res, next) {
        
        var moreSongQuery = Song.find({}).lean();
        var userQuery = User.findOne({ _id: req.cookies.loginId }).lean();

        Song.findOne({ "name": req.params.slug }).exec((err, song) => {

            var commentQuery = Comment.find({ "songId": song._id })
        .populate({
            path: 'userId',
            select: 'name avatar'
        });

            Promise.all([moreSongQuery, commentQuery, userQuery])
            .then(([songs, comments, user]) => {
                // find index of current song
                var index = songs.indexOf(songs.find(song => song.name == req.params.slug));

                songs.splice(index, 1);
                // // display 8 card 
                songs = songs.slice(0, 8);

                res.render('songDetail', {song, songs, comments, user, type: req.flash('type'), intro: req.flash('intro'), message: req.flash('message')})
            })
            .catch(next)
        });
    }

    //[POST] /song/:slug
    sendComment (req, res, next) {

        var userQuery = User.findOne({ _id: req.cookies.loginId }).lean();
        var songQuery = Song.findOne({ name: req.params.slug }).lean();

        Promise.all([userQuery, songQuery])
            .then(([user, song]) => {
                Comment.create({ userId: user._id, songId: song._id, content: req.body.comment })
                .then(() => res.redirect('back'))
                .catch(next)
        })
    }

    //[DELETE] /song/:commentId
    delete (req, res, next) {
        
        var userId = req.cookies.loginId;
        var commentId = req.params.commentId;

            Comment.findOne({ _id: commentId }).lean()
            .then((comment) => {
                if (userId == comment.userId) {
                    Comment.delete({ _id: req.params.commentId }).lean()
                    .then(() => res.redirect('back'))
                    .catch(next)
                }
                else {
                    req.flash('type', 'danger');
                    req.flash('intro', 'Deleted failed  ');
                    req.flash('message', 'You cannot delete other people\'s comments');
                    res.redirect('back');
                }
            })
        return;
    }
}

module.exports = new SongDetailController;