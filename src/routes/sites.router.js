const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController.js');

var authMethods = require('../middlewares/signup.middleware.js');

router.get('/', siteController.showHome);
// router.get('/login', siteController.showLogin);
router.get('/signup', siteController.showSignup);

router.post('/signup/store',authMethods.isInUse, siteController.store);

module.exports = router;