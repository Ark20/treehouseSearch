//functions that handle different routes
//blocking means it waits for file to be loaded before executing further 

//username profile information retreival
//add access to functions in profile.js
var Profile = require("./profile.js"); //require profile 
var renderer = require("./renderer.js"); //require profile 
var querystring = require("querystring")
var commonheader = {'Content-Type': 'text/html'};

function home(request, response) {
//if url === "/"&& GET show search
  if(request.url === "/") {//if home route 
    if(request.method.toLowerCase() === "get") {// if get method
      //only get request
  response.writeHead(200, commonheader);//write header with html content type 
  renderer.view("header", {}, response);
  renderer.view("search", {}, response);
  renderer.view("footer", {}, response);
  response.end();
  } else {
    //if url is post get post data from body 
    request.on("data", function(postBody){
      var query = querystring.parse(postBody.toString());
    response.writeHead(303, {"location": "/" + query.username});
    response.end();
    });
    //extract username
    
    //redirect to /username
  }
  }
}
function user(request, response) {
var username = request.url.replace("/", "");
if(username.length > 0) {
  response.writeHead(200, commonheader);
  renderer.view("header", {}, response);
  //get json from treehouse 
  //call profile to retrive data with students username as parameter 
  var studentProfile = new Profile(username);// new call of function profile
  //when all data is recieved pull values from response
  studentProfile.on("end", function(profileJSON){//add event handler for end of function data as parameter 
    //show profile
    
    //create object to store values 
    var values = {
      avatarUrl: profileJSON.gravatar_url, 
      username: profileJSON.profile_name, 
      badges: profileJSON.badges.length, 
      javascriptPoints: profileJSON.points.JavaScript 
    }
    
    //fill profile template with values and write it to the response 
  renderer.view("profile", values, response);
  renderer.view("footer", {}, response);
  response.end();
  });
studentProfile.on("error", function(error){
  renderer.view("error", {errorMessage:error.message}, response);
    renderer.view("search", {}, response);

  renderer.view("footer", {}, response);
    response.end();

//show error
});
 
  }

}

module.exports.home = home;
module.exports.user = user;