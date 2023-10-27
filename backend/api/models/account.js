const mongoose = require('mongoose');

const AccountSchema = {
    email: {
        type: String,
        required: true,
        unique: true,
    }, //unique helps in performamve optimization
    password: { type: String, required: true },
    empId: { type: String, required: true, },
    isAdmin: { type: Boolean, default: false },

}

const User = mongoose.model('user', AccountSchema);
module.exports = { User };