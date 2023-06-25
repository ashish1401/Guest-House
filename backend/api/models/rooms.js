const mongoose = require('mongoose');
const { Customer } = require(__dirname + "/customers.js")
// const { Status, StatusSchema } = require(__dirname + "/status.js")
const RoomsSchema = {
    roomNum: { type: String },
    roomType: { type: String },
    price: { type: Number },
    checkIn: { type: Date, ref: 'customer' },
    checkOut: { type: Date, ref: 'customer' }
}
const Room = mongoose.model("room", RoomsSchema);
module.exports = { Room, RoomsSchema };