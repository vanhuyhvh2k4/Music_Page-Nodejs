const express = require('express');
const router = express.Router();
const songDetailController = require('../app/controllers/SongDetailController.js');

var loginMiddleWare = require('../middlewares/auth.middleware.js')


router.get('/:slug', loginMiddleWare.requireLogin, songDetailController.showDetail);

router.post('/:slug', songDetailController.sendComment);

module.exports = router;