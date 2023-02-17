const express = require('express');
const router = express.Router();
const myadminController = require('../app/controllers/MyAdminController.js')

router.get('/', myadminController.showMyAdmin);

router.get('/create', myadminController.showCreatePage);

router.post('/stored', myadminController.stored);

module.exports = router;