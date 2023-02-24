var User = require('../models/User.js');
var md5 = require('md5');

class ProfileController {

    // [GET] /user/name
    showChangeName (req, res, next) {
        var loginId = req.cookies.loginId;
        res.render('users/changeName', {loginId, type: req.flash('type'), intro: req.flash('intro'), message: req.flash('message')});
    }

    // [PATCH] /user/name:id
    changeName (req, res, next) {
        User.findById({ _id: req.params.id }).lean()
            .then((user) => {
                if (user.name == req.body.name) {
                    req.flash('type', 'warning');
                    req.flash('intro', 'Name failed  ');
                    req.flash('message', 'This name is same your name, please change another name.');
                    res.redirect('back');
                }
                else {
                    User.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }).lean()
                                .then((user) => {
                                    req.flash('type', 'success');
                                    req.flash('intro', 'Name changed  ');
                                    req.flash('message', 'Your name was changed to ' + req.body.name);
                                    res.redirect('back');
                                })
                                .catch(next)
                }
            })

        
    }

    // [GET] /user/password
    showChangePassword (req, res, next) {
        var loginId = req.cookies.loginId;
        res.render('users/user-changePassword', {loginId, type: req.flash('type'), intro: req.flash('intro'), message: req.flash('message')});
    }

    // [PATCH] /user/password/:id
    changePassword (req, res, next) {
        User.findOne({ _id: req.params.id }).lean()
            .then((user) => {
                var currentHashPassword = md5(req.body.currentPassword);
                var newHashPassword = md5(req.body.newPassword);

                if (currentHashPassword != user.password) {
                    req.flash('type', 'danger');
                    req.flash('intro', 'Change Password Failed  ');
                    req.flash('message', 'Current password is not correct. Please try again');
                    res.redirect('back');
                }
                else if (req.body.newPassword != req.body.confirmPassword) {
                    req.flash('type', 'warning');
                    req.flash('intro', 'Change Password Failed  ');
                    req.flash('message', 'Repeat password is not correct. Please try again');
                    res.redirect('back');
                    }
                    else {
                        User.findByIdAndUpdate({ _id: req.params.id }, { password: newHashPassword }).lean()
                            .then((user) => {
                                req.flash('type', 'success');
                                req.flash('intro', 'Change Password Successfully  ');
                                req.flash('message', 'Your password was changed. Please login');
                                res.redirect('back');
                            })
                    }
            })
    }

}

module.exports = new ProfileController;