const express = require('express');
const router = express.Router();
const myadminController = require('../app/controllers/MyAdminController.js');
const multer  = require('multer');
const uploadImage = multer({ dest: './src/public/media/img/' });

var authMiddleWares = require('../middlewares/auth.middlewars.js');

router.get('/create', authMiddleWares.requireAuth, myadminController.showCreatePage);

router.post('/stored',
    uploadImage.single('image'),
    authMiddleWares.requireAuth,
    myadminController.stored);

router.get('/myMusic/edit/:name', authMiddleWares.requireAuth, myadminController.showEdit);

router.put('/myMusic/:name',
uploadImage.single('image'),
myadminController.upload);

router.patch('/myMusic/restore/:id', myadminController.restore);

router.delete('/myMusic/:id', myadminController.delete);

router.delete('/myMusic/deleteForce/:id', myadminController.deleteForce);

router.get('/myMusic/trash', authMiddleWares.requireAuth, myadminController.showTrash);

router.get('/myMusic', authMiddleWares.requireAuth, myadminController.showMyMusic);

router.get('/', authMiddleWares.requireAuth, myadminController.showMyAdmin);

module.exports = router;