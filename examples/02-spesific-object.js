/**
 * Fetches a specific object from NVDB
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("../index.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

vegvesen.connect(function(){
	/* fetch vegObjekt with type 45 and id 82559833 from NVDB */
    vegvesen.vegobjekter([45, 82559833], { srid: 4326 },  function(obj){
        console.log(obj);
    });
});

console.log("Connecting...");