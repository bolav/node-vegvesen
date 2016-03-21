/**
 * Fetches a specific object from NVDB
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("../vegvesen.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

vegvesen.connect(function(){
	/* fetch vegObjekt with id 82559833 from NVDB */
    vegvesen.vegobjekter.spesifiktVegobjekt(82559833, function(obj){
        console.log(obj);
    });
});