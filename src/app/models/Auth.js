const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Auth = new Schema({
        email: String,
        password: String,
}, {
    timestamps: true,
});


module.exports = mongoose.model('Auth', Auth)
