const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController.js');

var authMethods = require('../middlewares/signup.middleware.js');

var loginMiddleWare = require('../middlewares/auth.middleware.js')

router.get('/', loginMiddleWare.requireLogin, siteController.showHome);

router.get('/login', siteController.showLogin);

router.post('/login', siteController.login);

router.get('/signup', siteController.showSignup);

router.post('/signup/store',authMethods.isInUse, siteController.store);

module.exports = router;