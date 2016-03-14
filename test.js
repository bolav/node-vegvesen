var vegvesenClient  = require("./index.js");
var vegvesen = new vegvesenClient();

vegvesen.connect(function(){
    vegvesen.omrader.fylker(function(data){
        console.log(data);
    });
});