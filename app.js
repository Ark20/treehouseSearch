//handler for different urls 
var router = require("./router.js");//require router file 
var http = require('http'); //require http module 

http.createServer(function (request, response) { //create a server with response and request parameters 
  router.home(request, response); //call home function from router
    router.user(request, response); //call user function from router 
}).listen(3000);//listen on port 3000
  console.log(`Server running at http://<workspace-url>/`);//log message 
