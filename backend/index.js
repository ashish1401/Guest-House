const http = require('http');
const { dirname } = require('path');
require('dotenv').config();
const port = process.env.PORT || 3001;

//Express middleware to handle all requests
const app = require(__dirname + '/app.js')

//Create an HTTP Server
const server = http.createServer(app);
server.listen(port, function (req, res) {
    console.log("Running live");
});