/**
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("./index.js");
var vegvesen = new vegvesenClient();

/* Connect to the default API endpoint, and log all exposed methods */

vegvesen.connect(function(){
    console.log(vegvesen);
});