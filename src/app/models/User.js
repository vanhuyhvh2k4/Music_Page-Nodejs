const mongoose = require('mongoose');

var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema({
        avatar: {type: String, default: 'default.webp'},
        name: String,
        specialName: {type: String, default: 'Music Page'},
        email: String,
        phone: String,
        password: String,
        facebook: {type: String, default: 'facebook.com'},
        twiter: {type: String, default: 'twitter.com'},
        instagram: {type: String, default: 'instagram.com'},
}, {
    timestamps: true,
});

User.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, });

module.exports = mongoose.model('User', User)