const mongoose = require('mongoose');
const { Customer } = require(__dirname + "/customers.js")
// const { Status, StatusSchema } = require(__dirname + "/status.js")
const BookingSchema = {
    roomNum: { type: String },
    status: { type: Number, default: 0 },
    resId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
    checkIn: { type: Date, ref: 'customer' },
    checkOut: { type: Date, ref: 'customer' }
}
const Booking = mongoose.model("booking", BookingSchema);
module.exports = { Booking };