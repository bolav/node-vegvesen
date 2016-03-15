/**
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("./index.js");
var vegvesen = new vegvesenClient();

vegvesen.connect(function(){
    vegvesen.vegobjekter.spesifiktVegobjekt(141479144, function(vegobjekt){
        var station = vegobjekt.egenskaper[0].verdi;
        var type = vegobjekt.egenskaper[1].navn;
        var price = vegobjekt.egenskaper[1].verdi;
        var unit = vegobjekt.egenskaper[1].enhet.kortNavn;
        console.log("Toll station: " + station + ", " + type + ": " + price + " " + unit);
    });
});