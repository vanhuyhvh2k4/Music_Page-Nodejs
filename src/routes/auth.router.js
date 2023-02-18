const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthControlller.js')

router.get('/', authController.show)

router.post('/', authController.login)

module.exports = router;