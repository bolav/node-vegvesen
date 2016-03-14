var vegvesenClient  = require("./index.js");
var vegvesen = new vegvesenClient();

vegvesen.connect(function(){
    vegvesen.vegreferanse.veglenkeTilVegreferanse([545456], function(data){
        console.log(data);
    }); 
});