const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var mongooseDelete = require('mongoose-delete');

const Song = new Schema({
        name: String,
        author: String,
        description: String,
        image: String,
        mp4: String,
        mp3: String,
}, {
    timestamps: true,
});

// Song.plugin(mongooseDelete, { deletedAt : true });

// Song.plugin(mongooseDelete, { deletedAt: true});
Song.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true, });
module.exports = mongoose.model('Song', Song)
