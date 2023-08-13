require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        res.send(decoded)

    } catch (error) {
        return res.send(error)
    }
}