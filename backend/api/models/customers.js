const mongoose = require('mongoose');
const { Room, RoomsSchema } = require(__dirname + "/rooms.js");

const CustomerSchema = {
    roomNum: { type: String, ref: 'room' },
    status: { type: Number },
    empId: { type: String, required: true, },
    name: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

}
const Customer = mongoose.model("customer", CustomerSchema);
module.exports = { Customer, CustomerSchema };