const Song = require('../models/Song.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

class MyAdminController {

    // [GET] /myadmin
    showMyAdmin (req, res, next) {
        res.render('admin/adminHome');
    }

    // [GET] /myadmin/create
    showCreatePage (req, res, next) {
        res.render('admin/createMusic')
    }

    // [POST] /myadmin/stored
    stored (req, res, next) {

        const song = new Song({name : req.body.name,
                            author: req.body.author,
                            description: req.body.description, 
                            image: req.body.image,
                            mp4: req.body.mp4,
                        });
        song.save()
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /myadmin/myMusic
    showMyMusic (req, res, next) {
        var SongQuery = Song.find({ deleted: false }).lean();

        Promise.all([SongQuery, Song.countDocumentsDeleted()])
            .then(([songs, deletedCount]) => 
                res.render('admin/myMusic', {songs: songs, deletedCount: deletedCount})
            )
            .catch(next)
    }

    // [GET] /myadmin/myMusic/edit/:name
    showEdit (req, res, next) {
        Song.findOne({name : req.params.name}).lean()
            .then((song) => res.render('admin/editMusic', {song}))
            .catch(next)
    }

    // [PUT] /myadmin/myMusic/:name
    upload (req, res, next) {
        Song.updateOne({name : req.params.name}, {
            name : req.body.name,
            author: req.body.author,
            description: req.body.description, 
            image: req.body.image,
            mp4: req.body.mp4,
        })
            .then(() => res.redirect('/myadmin/myMusic'))
            .catch(next)
    }

    // [DELETE] /myadmin/myMusic/:id
    delete (req, res, next) {
        Song.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /myadmin/myMusic/trash
    showTrash (req, res, next) {
        Song.findDeleted({}).lean()
            .then((songs) => res.render('admin/trashMusic', {songs}))
            .catch(next)
    }

    // [PATCH] /myadmin/myMusic/restore/:id
    restore (req, res, next) {
        Song.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /myadmin/myMusic/deleteForce/:id
    deleteForce (req, res, next) {

        Song.deleteOne({ _id : req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[GET] /myadmin/account
    showAccount (req, res, next) {
        User.find({}).lean()
            .then((users) => res.render('admin/account', {users}))
            .catch(next)
    }

    //[PATCH] /myadmin/account/id:/change
    changeStatus (req, res, next) {
        User.delete({ _id: req.params.id })
            .then((user) => res.redirect('back'))
            .catch(next)
    }

    //[GET] /myadmin/account/trash
    showAccountTrash (req, res, next) {
        User.findDeleted({}).lean()
            .then((users) => res.render('admin/trashAccount', {users}))
            .catch(next)
    }

    //[PATCH] /myadmin/account/:id/restore
    enableAccount (req, res, next) {
        User.restore({ _id: req.params.id}).lean()
            .then((users) => res.redirect('back'))
            .catch(next)
    }

    //[GET] / myadmin/more
    showMore (req, res, next) {
        Song.find({})
          .lean()
          .exec((err, songs) => {
            if (err) return next(err);
      
            const promises = [];
      
            // Lặp qua từng bài hát và tìm số lượng comment và số lượng comment đã xóa
            songs.forEach(song => {
              const promise1 = Comment.countDocuments({ songId: song._id })
                .then(commentCount => {
                  song.Count = commentCount;
                });
      
              const promise2 = Comment.countDocumentsDeleted({ songId: song._id })
                .then(commentCountDeleted => {
                  song.CountDeleted = commentCountDeleted;
                });
      
              promises.push(promise1, promise2);
            });
      
            // Đợi tất cả các lời hứa hoàn thành trước khi render trang
            Promise.all(promises)
              .then(() => {
                res.render('admin/more', { songs });
              })
              .catch(next);
          });
      }

      //[GET] /myadmin/more/:songId
      showMoreDetail (req, res, next) {

        var songQuery = Song.findOne({ "_id": req.params.songId }).lean();

        var commentQuery = Comment.findWithDeleted({ "songId": req.params.songId }).populate({ path: 'userId', select: 'name avatar'});
            
        Promise.all([ songQuery, commentQuery])
            .then(([song, comments]) => res.render('admin/moreDetail', {song, comments}))
            .catch(next)
      }

      //[PATCH] /myadmin/more/:songId/:commentId
      changeStatusComment (req, res, next) {
        Comment.findOneWithDeleted({ "_id": req.params.commentId }).lean()
            .then((comment) => {
                if (comment.deleted) {
                    Comment.restore({ "_id": req.params.commentId }).lean()
                        .then(() => res.redirect('back'))
                        .catch(next)
                }
                else {
                    Comment.delete({ "_id": req.params.commentId }).lean()
                        .then(() => res.redirect('back'))
                        .catch(next)
                }
            })
      }
}

module.exports = new MyAdminController;