const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var mongooseDelete = require('mongoose-delete');

const Comment = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    songId: { type: Schema.Types.ObjectId, ref: 'Song' },
    content: String,
}, {
    timestamps: true,
});

Comment.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, });
module.exports = mongoose.model('Comment', Comment)