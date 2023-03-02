const Song = require('../models/Song.js');
const User = require('../models/User.js');
const fs = require('fs');

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
}

module.exports = new MyAdminController;