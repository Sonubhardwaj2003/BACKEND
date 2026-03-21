const http = require("http");

const server = http.createServer((req, res) => {
    res.write("Hello from Node Server");
    res.end();
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});

//this file(indexNode.js) doesnot require any node-Module,pakage.json etc file to run 
// run in terminal using--  node indexNode.js 
//go on bowser and run it using localhost:3000