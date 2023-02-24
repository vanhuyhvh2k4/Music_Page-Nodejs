const express = require('express');
const router = express.Router();
const ProfileController = require('../app/controllers/ProfileController.js');

router.get('/name', ProfileController.showChangeName);

router.patch('/name/:id', ProfileController.changeName);

router.get('/password', ProfileController.showChangePassword);

router.patch('/password/:id', ProfileController.changePassword);


module.exports = router;