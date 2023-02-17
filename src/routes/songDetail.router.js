const express = require('express');
const router = express.Router();
const songDetailController = require('../app/controllers/SongDetailController.js');

router.get('/:slug', songDetailController.showDetail);

module.exports = router;