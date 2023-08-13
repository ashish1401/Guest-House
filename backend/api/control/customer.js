const express = require('express');
const customerRoute = express.Router();
const mongoose = require('mongoose');

//import Customer, Room, Booking Schema
const { Customer } = require("../models/customers.js");
const { Room } = require("../models/rooms.js");
const { Booking } = require("../models/bookings.js");
const checkAuth = require('../middleware/check-auth.js');


//checkAuth-> admin can view all customers 
customerRoute.get("/", function (req, res, next) {
    Customer.find().exec().then(resp => {
        res.status(200).json({
            response: resp,
        })
    })
})

//Customer may post his/her booking as per requirements
customerRoute.post("/", function (req, res, next) {
    let startDate = req.body.checkIn;
    let endDate = req.body.checkOut;
    if (startDate >= endDate) return res.status(400).json({ message: "Enter Valid Date" });
    let roomExist = true;
    Room.findOne({ roomNum: req.body.roomNum }).exec()
        .then(resp => {
            //check if room exists or not
            // console.log(resp);
            if (!resp) {
                return res.status(400).json({
                    message: "INVALID ROOM NUM"
                });
            }
            else {
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
                        //ROOM ALREADY BOOKED
                        return res.status(301).json({
                            message: "Room Booked for the time period || Select appropriate duration ",
                        })
                    }
                    else {
                        // Since room isn't booked-> Alot room to customer
                        const customer = new Customer({
                            roomNum: req.body.roomNum,
                            empId: req.body.empId,
                            name: req.body.name,
                            checkIn: req.body.checkIn.toLocaleString(),
                            checkOut: req.body.checkOut.toLocaleString(),
                        })
                        return customer.save().then(resp => {
                            //Booking Created->Status set to 1-> Waiting for Admin approval
                            Booking.create({ status: 1, resId: resp._id, roomNum: resp.roomNum, empId: resp.empId, checkIn: resp.checkIn, checkOut: resp.checkOut }).then(test => {
                                // console.log(test);
                            })
                            res.status(201).json({
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
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                error: err,
            })
        })
})

//If the room exists, post the booking


//Check if Booking dates overlap with exisiting bookings

//get employ details of a particular ID
customerRoute.get("/:empId", function (req, res, next) {
    Customer.find({ empId: req.params.empId }).exec().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(404).json({
            error: err,
        })
    })
})
module.exports = customerRoute;