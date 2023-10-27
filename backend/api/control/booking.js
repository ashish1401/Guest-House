const { Booking } = require("../models/bookings.js");
const express = require('express');
const bookingRoute = express.Router();
const mongoose = require('mongoose');
const { Customer } = require("../models/customers.js");
const checkCustomer = require("../middleware/check-customer.js");
const Cookie = require("js-cookie");
const checkAuth = require("../middleware/check-auth.js");

//Protected Route
//view all bookings for admin
bookingRoute.get("/", checkCustomer, function (req, res, next) {
    //display all bookings with status:1 i.e waiting for approval
    Booking.find().exec().then(resp => {
        res.status(200).json(
            {
                count: resp.length,
                rooms: resp.map(doc => {
                    return {
                        roomId: doc._id,
                        roomNum: doc.roomNum,
                        empId: doc.empId,
                        checkIn: doc.checkIn.toLocaleString(),
                        checkOut: doc.checkOut.toLocaleString(),
                        resId: doc.resId,
                        status: doc.status,
                    }
                })
            }
        );
    }).catch(err => {
        res.status(500).json({
            error: err,
        })
    })
})

//Protected Route --> Only two people can open this ? 1. Admin  2. Protected User  
//view a particular reservation
bookingRoute.get("/:resId", function (req, res, next) {
    Booking.find({ resId: req.params.resId }).exec().then(doc => {
        if (doc) {
            res.status(200).send({
                roomId: doc._id,
                roomNum: doc.roomNum,
                empId: doc.empId,
                checkIn: doc.checkIn.toLocaleString(),
                checkOut: doc.checkOut.toLocaleString(),
                resId: doc.resId,
                status: doc.status,
            })
        } else {
            res.status(403).send({
                error: "Invalid Reservation ID",
            })
        }
    }).catch(err => {
        res.json({
            error: err,
        });
    })
})

bookingRoute.get("/reservations/:empId", checkAuth, function (req, res, next) {
    Booking.find({ empId: req.params.empId }).exec().then(doc => {
        if (doc) {
            console.log(doc);

            res.status(200).send(doc)
        } else {
            res.status(403).send({
                error: "Invalid Employee ID",
            })
        }
    }).catch(err => {
        res.json({
            error: err,
        });
    })
})

bookingRoute.get("/reservations/:empId/pending", checkAuth, function (req, res, next) {
    if (req.headers.empid === req.params.empId) {
        Booking.find({ empId: req.params.empId, status: 1 }).exec().then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).send(doc)
            } else {
                res.status(403).send({
                    error: "Invalid Employee ID",
                })
            }
        }).catch(err => {
            res.json({
                error: err,
            });
        })
    } else {
        res.send("Auth Failed")
    }
})

bookingRoute.get("/reservations/:empId/confirmed", checkAuth, function (req, res, next) {

    if (req.headers.empid === req.params.empId) {
        Booking.find({ empId: req.params.empId, status: 2 }).exec().then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).send(doc)
            } else {
                res.status(403).send({
                    error: "Invalid Employee ID",
                })
            }
        }).catch(err => {
            res.json({
                error: err,
            });
        })
    } else {
        res.send(false);
    }
})



//Protected Route
//Approve booking
bookingRoute.patch("/:resId", function (req, res, next) {
    if (req.body.status <= 2) {
        if (req.body.status == 0) {
            Booking.deleteOne({ resId: req.params.resId }).exec()
                .then(data => {
                    res.status(201).json({
                        Message: "Room declined",
                    })
                })
                .then(() => {
                    return Customer.deleteOne({ _id: req.params.resId });
                }).catch(err => {
                    res.status(500).json({
                        error: err,
                    })
                })

        }
        else if (req.body.status == 2) {
            Booking.updateOne({ resId: req.params.resId }, { $set: { status: req.body.status } }).then(data => {
                res.status(200).json({
                    Message: "Room Approved successfully",
                })
            }).catch(err => {
                res.status(500).json({
                    error: err,
                })
            })
        }
    } else {
        res.json({
            err: "Invalid status",
        })
    }
})


module.exports = bookingRoute;