const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// var mongooseDelete = require('mongoose-delete');

const Comment = new Schema({
    userId: String,
    userName: String,
    songId: String,
    songName: String,
    content: String,
}, {
    timestamps: true,
});

// Song.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, });
module.exports = mongoose.model('Comment', Comment)