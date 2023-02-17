const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Song', Song)
