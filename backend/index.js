const http = require('http');
const { dirname } = require('path');
const port = process.env.PORT || 3001;
const app = require(__dirname + '/app.js')
const server = http.createServer(app);
server.listen(port, function (req, res) {
    console.log("Live");
});