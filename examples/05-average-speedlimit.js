/**
 * Calculate average speed limit in given muncipality, using NVDB data
 * WARNING: If the search area is large, this will take a long time!
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("../index.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

var kommune = 1201; //1201 == Bergen kommune
var kommuneNavn;

function findKommune(kommuner){
    return kommuner.nummer === kommune;   
}

var searchObject = {
	lokasjon: {kommune: [kommune]},
	objektTyper: [{id: 105, antall: 9999}]
}

var averageSpeed = 0;
var found = 0;

vegvesen.connect(function(){
    vegvesen.omrader(['kommuner'], function(obj){
       kommuneNavn = obj.find(findKommune).navn;
        console.log("Fetching data for " + kommuneNavn + ", please wait...");
    });
    vegvesen.vegobjekter([105], { kommune: kommune, antall: 9999, inkluder: "egenskaper" }, function(obj){
        var results = obj.objekter;
        for(item in results){
            var speedObject = results[item].egenskaper;
            for(properties in speedObject){
                if(speedObject[properties].id === 2021){
                    averageSpeed += parseInt(speedObject[properties].verdi);
                    found++;
                }
            }
        }
        averageSpeed = (averageSpeed / found).toFixed(2);
        console.log("Average speed limit in " + kommuneNavn + " is " + averageSpeed + " km/h");
    });
});

console.log("Connecting...");