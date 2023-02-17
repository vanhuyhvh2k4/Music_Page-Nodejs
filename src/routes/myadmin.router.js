const express = require('express');
const router = express.Router();
const myadminController = require('../app/controllers/MyAdminController.js')

router.get('/create', myadminController.showCreatePage);

router.post('/stored', myadminController.stored);

router.get('/myMusic/edit/:name', myadminController.showEdit);

router.put('/myMusic/:name', myadminController.upload);

router.get('/myMusic', myadminController.showMyMusic);

router.get('/', myadminController.showMyAdmin);

module.exports = router;