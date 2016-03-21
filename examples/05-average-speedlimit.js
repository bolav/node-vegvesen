/**
 * Calculate average speed limit in Austevoll kommune, using NVDB data
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("../vegvesen.js");	//replace with require("vegvesen") in production
var vegvesen = new vegvesenClient();			//create a new instance of vegvesenClient

var searchObject = {
	lokasjon: {kommune: [1244]},
	objektTyper: [{id: 105, antall: 2000}]
}

var averageSpeed = 0;

vegvesen.connect(function(){
    vegvesen.sokegrensesnitt.sok(searchObject, function(obj){
        var results = obj.resultater[0].vegObjekter;
        for(item in results){
            var speedObject = results[item].egenskaper;
            for(properties in speedObject){
                if(speedObject[properties].id === 2021){
                    averageSpeed += parseInt(speedObject[properties].verdi);
                }
            }
        }
        averageSpeed = (averageSpeed / obj.totaltAntallReturnert).toFixed(2);
        console.log("Average speed limit in Austevoll kommune is " + averageSpeed + " km/h");
    });
    console.log("Fetching data, please wait...");
});