const Song = require('../models/Song.js');
const moment = require('moment');

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
        const song = new Song(req.body)
        song.save()
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /myadmin/myMusic
    showMyMusic (req, res, next) {
        Song.find({}).lean()
            .then((songs) => res.render('admin/myMusic', {songs}))
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
        Song.update({name : req.params.name}, req.body).lean()
            .then(() => res.redirect('/myadmin/myMusic'))
            .catch(next)
    }
}

module.exports = new MyAdminController;