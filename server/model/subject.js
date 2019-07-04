const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: String,
    nickname: String,
    role: String,
});

module.exports = mongoose.model('Subject', todoSchema)