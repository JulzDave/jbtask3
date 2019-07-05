var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/api');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/training0419',{ useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    const error = new Error("Data Not Found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
