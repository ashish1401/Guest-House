const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const app = express();
const { dirname } = require('path');

//Routes for all endpoints
const customerRoute = require(__dirname + '/api/control/customer.js');
const roomRoute = require(__dirname + '/api/control/room.js');
const bookingRoute = require(__dirname + '/api/control/booking.js');

//MORGAN alows you to view the status-codes for each request on your console.
const morgan = require('morgan');

//Setting up MongoDB
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://admin:admin@cluster0.tr5macg.mongodb.net/guestHouseDB`).then(resp => {
    console.log("Connected to Database");
}).catch(err => {
    console.log({
        error: err,
    });
});

//Setting up morgan
app.use(morgan('dev'));

//Setting up and using body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Fixed CORS-Cross Origin Resource Sharing errors 
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
app.use('/bookings', bookingRoute);

//Invalid enpoints
app.use(function (req, res, next) {
    const error = new Error('Not Found Anywhere'); //added message to error
    error.status = 404;
    next(error);
})

//Addressing unknown errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message //all automatically gen errors wil have an message 
        }
    })
})

//export the express middleware
module.exports = app;