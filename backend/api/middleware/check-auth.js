const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function (req, res, next) {
    //jwt.verify(token)

    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded);
        req.userData = decoded;
        console.log(req.userData);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }

};