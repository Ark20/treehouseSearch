const fs = require('fs');//require module that lets us read files 
// add values from data to template, return template 
//function that takes values and content 
function mergeValues(values, content) {
//cycle over 
  for(var key in values) {
  //replace all {{keys}} with values from values object
    content = content.replace("{{" + key + "}}", values[key]); //search for strimg of key 
  }
    //return merged content
  return content;
}
//view function reads template adds values and writes this to response 
//take template, values object and response as param 
function view(templateName, values, response ) {
//read in files from template
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
  //insert values 
  //function that takes values + template contents 
  fileContents = mergeValues(values, fileContents);
  
  //write out the contents to response 
  response.write(fileContents);

}
   

module.exports.view = view;
module.exports.mergeValues = mergeValues;