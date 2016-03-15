# node-vegvesen
Node.JS wrapper for Statens Vegvesen's NVDB REST APIs

### Installation

`npm install vegvesen`

### Usage
```
var VegvesenClient = require("vegvesen");
var vegvesen = new VegvesenClient();

vegvesen.connect(){function(){
    vegvesen.omrade.fylker(function(data){
        console.log(data);
    });
}}

```
All methods are loaded dynamically when connect() is called. This is 
dictated by the specification of the API. So for an up-to-date guide, check
the official [documentation](https://www.vegvesen.no/nvdb/api/dokumentasjon/).

Function names are based off of the "rel" property of each endpoint.
So e.g. "<ressurs rel="spesifikt-vegobjekt" uri="/vegobjekter/objekt/{vegobjekt-id}"/>",
can be accessed by calling `vegvesen.vegobjekter.spesifiktVegobject();`.
Some methods requires parameters, theese can be specified like:
`vegvesen.vegobjekter.spesifiktVegobject(487458622);`
In case a method requires multiple parameters, they can be supplied by passing an
array containing the arguments, e.g.
`vegvesen.vegobjekter.spesifiktVegobject([487458622,598569733]);`.

To access the result of a API query, every method also takes a callback function as
the last argument, e.g.

```vegvesen.vegobjekter.spesifiktVegobject(487458622, function(data){
    console.log(data);
});```

If you have any questions regarding the usage of this API client, just contact me
through the contact information provided on the github repo, and also specified in
the npm package.json