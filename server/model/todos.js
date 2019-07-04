const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    Description: String,
    Date: Date,
    subject: String,
});

module.exports = mongoose.model('todo', todoSchema)