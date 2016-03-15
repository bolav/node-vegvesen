var vegvesenClient  = require("./index.js");
var vegvesen = new vegvesenClient();

/* Connect to the default API endpoint, and log all exposed methods */

vegvesen.connect(function(){
    console.log(vegvesen);
});