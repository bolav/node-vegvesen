# node-vegvesen
Node.JS wrapper for Statens Vegvesen's NVDB REST APIs

### Installation

`npm install vegvesen`

### Usage

```javascript
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
```
Output:

`Toll station: Damsgård, Takst stor bil: 38.0 Kr`

All methods are loaded dynamically when connect() is called. This is 
dictated by the specification of the API. So for an up-to-date guide, check
the official [documentation](https://www.vegvesen.no/nvdb/api/dokumentasjon/).

### Examples
If the API endpoint url changes, you can provide an optional argument in the constructor

```javascript
new VegvesenClient("https://api.endpoint.url");
```

You can also provide an optional options object to change request and response parameters

```javascript
new VegvesenClient("https://api.endpoint.url", {
    requestConfig: {
     timeout: 1000,
        noDelay: true,
        keepAlive: true
    },
    responseConfig: {
        timeout: 1000 //response timeout 
    }
});
```

Function names are based off of the "rel" property of each API object.
So e.g. "<ressurs rel="spesifikt-vegobjekt" uri="/vegobjekter/objekt/{vegobjekt-id}"/>",
can be accessed by calling 

```javascript
vegvesen.vegobjekter.spesifiktVegobjekt();
```

Some methods requires parameters, theese can be specified like:

```javascript
vegvesen.vegobjekter.spesifiktVegobjekt(487458622);
```

In case a method requires multiple parameters, they can be supplied by passing an
array containing the arguments, e.g.

```javascript
vegvesen.vegobjekter.spesifiktVegobjekt([487458622,598569733]);
```


To access the result of an API call, every method also takes a callback function as
the last argument, e.g.

```javascript
vegvesen.vegobjekter.spesifiktVegobjekt(487458622, function(data){
    console.log(data);
});
```

### Methods

Currently at the time of publishing this version of the module, this is the
functions exposed by the API:

##### definisjoner
* vegobjektTyper()
* vegobjektTypeDefinisjon()
* egenskapsTypeDefinisjon()
* datakatalogVersjon()
##### vegobjekter
* vegobjekterAvGittType()
* spesifiktVegobjekt()
##### sokegrensesnitt
* sok()
##### vegreferanse
* vegreferanseFraUtm33Koordinat()
* vegreferanseFraWgs84Koordinat()
* vegreferanseFraVeglenke()
* vegreferanseFraVegreferansenavn()
* vegreferanse()
* veglenkeTilVegreferanse()
##### omrader
* regioner()
* vegavdelinger()
* fylker()
* politidistrikter()
* kommuner()
* riksvegruter()
* kontraktsomrader()
##### endringer
* endringerObjekttype

### Contact

If you have any questions regarding the usage of this API client, just contact me
through the contact information provided on the github repo, and also specified in
the npm package.json

### Legal

This module is released as GNU General Public License version 2. You are free to use this in your own applications.
However, the data gathered from NVDB is licensed under the [NLOD](http://data.norge.no/nlod/no/1.0) license (Norwegian only).
If you use the data in your application, you are required by this license to always include the following text:

```
Inneholder data under norsk lisens for offentlige data (NLOD) tilgjengeliggjort av Statens vegvesen.
```