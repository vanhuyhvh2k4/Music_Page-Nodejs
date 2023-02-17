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
        const song = new Song(req.body)
        song.save()
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new MyAdminController;