const express = require('express');
const router = express.Router();
const myadminController = require('../app/controllers/MyAdminController.js')

router.get('/create', myadminController.showCreatePage);

router.post('/stored', myadminController.stored);

router.get('/myMusic/edit/:name', myadminController.showEdit);

router.put('/myMusic/:name', myadminController.upload);

router.patch('/myMusic/restore/:id', myadminController.restore);

router.delete('/myMusic/:id', myadminController.delete);

router.delete('/myMusic/deleteForce/:id', myadminController.deleteForce);

router.get('/myMusic/trash', myadminController.showTrash);

router.get('/myMusic', myadminController.showMyMusic);

router.get('/', myadminController.showMyAdmin);

module.exports = router;