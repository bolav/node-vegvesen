var vegvesenClient  = require("./index.js");
var vegvesen = new vegvesenClient();

vegvesen.connect(function(){
    vegvesen.omrader.regioner(function(data){
        console.log(data);
    });
});