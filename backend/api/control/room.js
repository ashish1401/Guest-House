const express = require('express');
const roomRoute = express.Router();
const mongoose = require('mongoose');
const { Room } = require("../models/rooms");
const { Booking } = require("../models/bookings");

roomRoute.get("/auth", function (req, res, next) {
    Booking.find({ status: 1 }).exec().then(resp => {
        // console.log(resp);
        res.status(200).json(
            {
                count: resp.length,
                rooms: resp.map(doc => {

                    return {
                        roomId: doc._id,
                        roomNum: doc.roomNum,
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

//add checkauth here
//avoid duplicacy
roomRoute.post("/", function (req, res, next) {
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
                res.status(200).json({
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


    // res.status(200).json({
    //     order: order,
    // })
)

//check auth
// :roomID is replaced using req.params.roomID
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

// orderRoute.delete("/:orderID", function (req, res, next) {
//     Order.deleteOne({ _id: req.params.orderID }).exec().then(resp => {
//         res.status(200).json({
//             result: resp,
//             info: {
//                 type: "GET",
//                 url: "localhost/3000/orders",
//                 message: "order deleted successfully"
//             }
//         })
//     }).catch(err => {
//         res.status(500).json({
//             error: err,
//         })
//     })
// })





module.exports = roomRoute;