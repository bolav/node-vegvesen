/**
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var vegvesenClient  = require("./index.js");
var vegvesen = new vegvesenClient();

vegvesen.connect(function(){
    vegvesen.vegobjekter.spesifiktVegobjekt(82559833, function(obj){
        console.log(obj);
    });
});