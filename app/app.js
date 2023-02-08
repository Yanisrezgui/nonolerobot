const express = require('express');
const logger = require('morgan');
const helmet = require("helmet");

const indexRouter = require('./routes/index');
const testRouter = require('./routes/test');


const app = express();

const env = process.env.NODE_ENV;

app.use(helmet());
app.use(express.static('public'))

if (env === "development")
    app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/test', testRouter);

module.exports = app;