const jwt = require('jsonwebtoken');
require("dotenv").config();
const mongoose = require('mongoose');
const { User } = require("../models/account.js");
module.exports = function (req, res, next) {
    //jwt.verify(token)
    try {
        const empId = req.headers.empid;
        console.log(empId)
        User.findOne({ empId: empId }).exec().then(resp => {
            if (resp.isAdmin === true) {
                next();
            } else {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
        }).catch(err => console.log(err))
    } catch (err) {
        console.log(err);
    }

    // try {
    //     console.log(req.headers);
    //     const token = req.headers.authorization.split(" ")[1];
    //     const decoded = jwt.verify(token, process.env.JWT_KEY);
    //     console.log(decoded);
    //     req.userData = decoded;
    //     console.log(req.userData);
    //     next();
    // } catch (error) {
    //     return res.status(401).json({
    //         message: 'Auth Failed'
    //     });
    // }

};