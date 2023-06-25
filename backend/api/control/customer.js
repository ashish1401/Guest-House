const express = require('express');
const customerRoute = express.Router();
const mongoose = require('mongoose');
const { Customer } = require("../models/customers.js");
const { Room } = require("../models/rooms.js");
const { Booking } = require("../models/bookings.js");


//check auth - > admin can view all customers 
customerRoute.get("/", function (req, res, next) {
    Customer.find().exec().then(resp => {
        res.status(200).json({
            response: resp,
        })
    })
})

customerRoute.post("/", function (req, res, next) {

    Room.findOne({ roomNum: req.body.roomNum }).exec().then(resp => {
        //check if room exists``
        console.log(resp);
        if (!resp) {
            res.status(400).json({
                message: "INVALID ROOM NUM"
            })
        }
        // }
    }
    ).catch(err => {
        console.log(err);
        res.json({
            error: err,
        })
    })
    let startDate = req.body.checkIn;
    let endDate = req.body.checkOut;
    Booking.find({
        $or: [
            { checkIn: { $gte: startDate, $lte: endDate } },
            { checkOut: { $gte: startDate, $lte: endDate } },
            {
                $and: [
                    { checkIn: { $lt: startDate } },
                    { checkOut: { $gt: endDate } }
                ]
            }
        ], roomNum: req.body.roomNum
    }).then(data => {
        if (data.length > 0) {
            return res.json({
                message: "Room Booked for the time period",
            })
        }
        else {
            // check if status is vacant
            // if (resp.status === 0) {
            const customer = new Customer({
                roomNum: req.body.roomNum,
                empId: req.body.empId,
                name: req.body.name,
                checkIn: req.body.checkIn.toLocaleString(),
                checkOut: req.body.checkOut.toLocaleString(),
            })
            return customer.save().then(resp => {
                Booking.create({ status: 1, resId: resp._id, roomNum: resp.roomNum, checkIn: resp.checkIn, checkOut: resp.checkOut }).then(test => {
                    // console.log(test);
                })
                res.status(200).json({
                    message: 'Reservation made, wait for approval',
                    newReservation: {
                        reservationId: resp._id,
                        roomNum: resp.roomNum,
                        empId: resp.empId,
                        name: resp.name,
                        message: "Application Received"
                    }
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    error: err
                })
            })
        }
    }).catch(err => {
        console.log(err);
    })
})

module.exports = customerRoute;