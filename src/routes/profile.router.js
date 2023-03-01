const express = require('express');
const router = express.Router();
const ProfileController = require('../app/controllers/ProfileController.js');
const multer  = require('multer');
var storage = multer.diskStorage(
    {
        destination: './src/public/media/users',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname);
        }
    }
);

var upload = multer( { storage: storage } );

// router.get('/name', ProfileController.showChangeName);

// router.patch('/name/:id', ProfileController.changeName);

router.get('/edit', ProfileController.showEditProfile)

router.put('/edit/:userId', upload.single('avatar'), ProfileController.changeProfile)

router.get('/password', ProfileController.showChangePassword);

router.patch('/password/:id', ProfileController.changePassword);

router.get('/', ProfileController.showProfile)


module.exports = router;