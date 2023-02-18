const express = require('express');
const router = express.Router();
const myadminController = require('../app/controllers/MyAdminController.js');
const multer  = require('multer');
var storage = multer.diskStorage(
    {
        destination: './src/public/media/uploads',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname);
        }
    }
);

// const upload = multer({ dest: './src/public/media/uploads/' });
var upload = multer( { storage: storage } );

var authMiddleWares = require('../middlewares/auth.middlewars.js');

router.get('/create', authMiddleWares.requireAuth, myadminController.showCreatePage);

router.post('/stored',
    upload.fields([
        {name: 'image', maxCount: 1},
        {name: 'mp4', maxCount: 1},
        {name: 'mp3', maxCount: 1},
    ]),
    authMiddleWares.requireAuth,
    myadminController.stored);

router.get('/myMusic/edit/:name', authMiddleWares.requireAuth, myadminController.showEdit);

router.put('/myMusic/:name',
    upload.fields([
        {name: 'image', maxCount: 1},
        {name: 'mp4', maxCount: 1},
        {name: 'mp3', maxCount: 1},
    ]),
myadminController.upload);

router.patch('/myMusic/restore/:id', myadminController.restore);

router.delete('/myMusic/:id', myadminController.delete);

router.delete('/myMusic/deleteForce/:id', myadminController.deleteForce);

router.get('/myMusic/trash', authMiddleWares.requireAuth, myadminController.showTrash);

router.get('/myMusic', authMiddleWares.requireAuth, myadminController.showMyMusic);

router.get('/', authMiddleWares.requireAuth, myadminController.showMyAdmin);

module.exports = router;