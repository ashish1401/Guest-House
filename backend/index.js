//Kindly note that env variables are hard coded and not in a .env file due to an exisiting device issue
const http = require('http');
const { dirname } = require('path');
const port = 3001;

//Express middleware to handle all requests
const app = require(__dirname + '/app.js')

//Create an HTTP Server
const server = http.createServer(app);
server.listen(port, function (req, res) {
    console.log("Live");
});