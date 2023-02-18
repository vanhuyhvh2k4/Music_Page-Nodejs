const Song = require('../models/Song.js');

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
        // res.body.image = req.file.path.split("\\").slice(2).join('/') + '.jpg';
        const song = new Song({name : req.body.name,
                            author: req.body.author,
                            description: req.body.description, 
                            image: req.file.path.split("\\").slice(4).join(''),
                            mp4: req.body.mp4,
                            mp3: req.body.mp3
                        });
        song.save()
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [GET] /myadmin/myMusic
    showMyMusic (req, res, next) {
        Song.find({ deleted : false}).lean()
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
        var path = req.file.path.split('\\').slice(4).join('');
        Song.updateOne({name : req.params.name}, {
            name : req.body.name,
            author: req.body.author,
            description: req.body.description, 
            image: path,
            mp4: req.body.mp4,
            mp3: req.body.mp3
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
        Song.find({ deleted: true}).lean()
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
        Song.deleteOne({ _id : req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new MyAdminController;