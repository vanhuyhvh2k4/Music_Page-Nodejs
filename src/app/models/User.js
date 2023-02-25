const mongoose = require('mongoose');

var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema({
        name: String,
        email: String,
        password: String,
}, {
    timestamps: true,
});

User.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, });

module.exports = mongoose.model('User', User)