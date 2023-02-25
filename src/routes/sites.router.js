const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController.js');

var authMethods = require('../middlewares/signup.middleware.js');

var loginMiddleWare = require('../middlewares/auth.middleware.js')

router.get('/search', siteController.search);

router.get('/forgot', siteController.showForgot);

router.post('/forgot', siteController.checkExist);

router.get('/forgot/:email', siteController.showChange);

router.post('/forgot/:email', siteController.checkName);

router.patch('/forgot/:email/update', siteController.update);

router.get('/login', siteController.showLogin);

router.post('/login', siteController.login);

router.get('/signup', siteController.showSignup);

router.post('/signup/store',authMethods.isInUse, siteController.store);

router.get('/', loginMiddleWare.requireLogin, siteController.showHome);

module.exports = router;