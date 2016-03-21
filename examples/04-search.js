/**
 * Search for objects from NVDB
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("../vegvesen.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

/* Search object example
{
    lokasjon: {  // location object (optional)
        bbox: "34488.685,6565359.516,255435.631,6651350.054",  // bounding-box (optional)
        srid: "UTM33" // If not set, UTM-33 will be used as default. Can be: UTM33 or WGS84 (optional)
        kommune: [1601, 1663], // Limit search to specific municipalities by id (optional)
        fylke: [16], // Limit search to specific counties by id (optional)
        region: [2, 5], // Limit search to specific regions by id (optional)
        veglenker: [{id:1, fra:0, til:1}], // Limit to specific road-links {id, from, to} (optional)
        kontraktsomrade: ["1603 OrkdalSkaun 2012-2017"], // Limit to contract areas (optional)
        riksvegrute: ["RUTE1", "RUTE3"], // Limit search to specific highway routes (optional)
        vegreferanse: ["E", "R2"], // Limit search to European route, and highway route (optional)
    },
    objektTyper: [
        {
            id: 45, antall: 10, start: 11 // Get the toll stations (id 45) from number 11 to 20 {id, number, from}
        },
        {
            id: 696, antall: 10, filter: [] // Maximum 10 objects of type 696 (Core samples) {id, number, filter}
        },
        {
            id: 105, antall: 1000, endretdato: "2013-04-01T19:00:00+0100" // The 1000 first speedlimits changed since 19:00 1. April 2013 {id, number, date}
        }
    ]
}*/

var searchObject = {
	lokasjon: {kommune: [1201]},
	objektTyper: [{id: 105, antall: 10}]
}

vegvesen.connect(function(){
    vegvesen.sokegrensesnitt.sok(searchObject, function(obj){
        console.log(obj);
    });
});