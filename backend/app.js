const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const { dirname } = require('path');
const customerRoute = require(__dirname + '/api/control/customer.js');
const roomRoute = require(__dirname + '/api/control/room.js');
// const statusRoute = require(__dirname + '/api/routes/status');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:admin@cluster0.tr5macg.mongodb.net/guestHouseDB");
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static("uploads")); //is publically available only to urls statring with /upload

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization "
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE ')
    }
    next();
})


//Routes which should handle requests
app.use('/customers', customerRoute);
app.use('/rooms', roomRoute);
//middlewares

app.use(function (req, res, next) {
    const error = new Error('Not Found Anywhere'); //added message to error
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message //all automatically gen errors wil have an message 
        }
    })
})


module.exports = app;