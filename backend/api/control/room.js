const express = require('express');
const roomRoute = express.Router();
const mongoose = require('mongoose');

//import Room and Booking Schema
const { Room } = require("../models/rooms");
const { Booking } = require("../models/bookings");


//display all rooms available for booking or taking reservations
roomRoute.get("/", function (req, res, next) {
    Room.find().exec().then(resp => {
        res.status(200).json(
            {
                count: resp.length,
                rooms: resp.map(doc => {
                    return {
                        roomId: doc._id,
                        roomNum: doc.roomNum,
                        description: doc.roomType,
                        price: doc.price,
                        resId: doc.resId,
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


//add checkAuth here ->Admin may POST new rooms , available for booking
roomRoute.post("/", function (req, res, next) {
    //Check if such a room exists already and then POST
    Room.find({ roomNum: req.body.roomNum }).exec().then(resp => {
        if (resp.length != 0) {
            return (res.json({
                message: "Room exists"
            }))
        }
        else {
            const room = new Room({
                roomNum: req.body.roomNum,
                roomType: req.body.roomType,
                description: req.body.description,
                price: req.body.price,

            })
            return room.save().then(resp => {
                res.status(201).json({
                    message: 'Room Registered',
                    newRoom: {
                        _id: resp._id,
                        roomNum: resp.roomNum,
                        roomType: resp.roomType,
                        price: resp.price,
                        description: resp.description

                    }
                })
            })
        }
    })
}
)

//add checkAuth here --> allow the admin to check bookings for room with given room num. 
roomRoute.get("/:roomNum", function (req, res, next) {
    Room.find({ roomNum: req.params.roomNum }).then(resp => {
        if (!resp) {
            res.status(404).json({
                message: "Invalid Room Id"
            })
        }
        resp.map(el => {
            res.status(200).json(
                {
                    _id: el._id,
                    roomNum: el.roomNum,
                    roomType: el.roomType,
                    price: el.price,
                    status: el.status,
                    resId: el.resId

                }
            )
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })
})

module.exports = roomRoute;