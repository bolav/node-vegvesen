/**
 * Connect to the API endpoint, and retrieve 
 * API functions
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("../vegvesen.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

vegvesen.connect(function(){
	/* dumps the vegvesen object, usefull for checking available API calls */
	console.log(vegvesen);
});