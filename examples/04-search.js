/**
 * Search for objects from NVDB
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

/* See https://www.vegvesen.no/nvdb/api/dokumentasjon/sok for documentation of search object */

var vegvesenClient  = require("../index.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

var searchObject = {
	lokasjon: {kommune: [1201]},
	objektTyper: [{id: 105, antall: 10}]
}

vegvesen.connect(function(){
    vegvesen.sokegrensesnitt.sok(searchObject, function(obj){
        console.log(obj);
    });
});

console.log("Connecting...");