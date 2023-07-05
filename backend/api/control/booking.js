const { Booking } = require("../models/bookings.js");
const express = require('express');
const bookingRoute = express.Router();
const mongoose = require('mongoose');

bookingRoute.get("/", function (req, res, next) {
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

bookingRoute.patch("/:resId", function (req, res, next) {
    Booking.updateOne({ resId: req.params.resId }, { $set: { status: req.body.status } }).then(data => {
        res.status(200).json({
            Message: "Room Approved successfully",
        })
    })
})


module.exports = bookingRoute;