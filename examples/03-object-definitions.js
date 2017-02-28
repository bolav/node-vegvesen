/**
 * Fetches object definitions from NVDB
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("../index.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

vegvesen.connect(function(){
    vegvesen.vegobjekttyper(function(obj){
        console.log(obj);
    });
});

console.log("Connecting...");