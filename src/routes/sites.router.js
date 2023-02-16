const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController.js');

router.get('/:slug', siteController.showDetail);
router.get('/', siteController.showHome);

module.exports = router;