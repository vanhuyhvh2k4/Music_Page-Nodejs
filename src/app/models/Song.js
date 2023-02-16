const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Song = new Schema({
        name: String,
        description: String,
        img: String,
        mp4: String,
        mp3: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Song', Song)
