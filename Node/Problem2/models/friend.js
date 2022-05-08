const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    id: Number,
    name: String
});

module.exports = mongoose.model('friend', friendsSchema, 'friends');