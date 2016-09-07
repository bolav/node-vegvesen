# vegvesen
NodeJS wrapper for Statens Vegvesen's NVDB REST APIs

* [Installation](#installation)
* [Usage](#usage)
* [Examples](#examples)
* [Methods](#methods)
* [Building](#building)
* [Contributing](#contributing)
* [Contact](#contact)
* [Legal](#legal)

### Installation

`npm install vegvesen`

You can also download it manually. 
* [Latest stable release](https://github.com/thomas-alrek/node-vegvesen/releases/latest)

### Usage

```javascript
var VegvesenClient  = require("vegvesen");
var vegvesen = new VegvesenClient();

vegvesen.connect(function(){
    vegvesen.vegobjekter.spesifiktVegobjekt(82559833, function(obj){
        console.log(obj);
    });
});
```

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
So e.g. 

```xml
<ressurs rel="spesifikt-vegobjekt" uri="/vegobjekter/objekt/{vegobjekt-id}"/>
```
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
vegvesen.vegreferanse.vegreferanseFraWgs84Koordinat([5.26835878197702, 60.38078971681345]});
```


To access the result of an API call, every method also takes a callback function as
the last argument, e.g.

```javascript
vegvesen.vegobjekter.spesifiktVegobjekt(487458622, function(data){
    console.log(data);
});
```
More examples can be found under the folder ["examples"](examples)

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
* endringerObjekttype()

### Building

In version 0.3.0 build scripts was implemented. In the future, this will make it possible to build a browser compatible version of this client.
As of now it isn't working, because there is still some dependencies issues that needs to be worked out.
The build script however does work, and can be testet today.

To build node-vegvesen run the following command inside the root directory of the sources:

> npm run-script build

This will build a bundled file, and a bundled + minified file under the dist directory.
There is also a prepublish hook in the package.json that automatically builds before publishing to npm.

### Contributing

Do you want to help me with the development of node-vegvesen? Great!
If you would like to contribute to the node-vegvesen project, please check out the contribution guide in [CONTRIBUTING.md](CONTRIBUTING.md).

If you don't know how to contribute, but still have some suggestions, please create a new Issue, or contact me directly. Please check out the [Contact](#contact) information for more.

### Contact

If you have any questions regarding the usage of this API client, just contact me
through the contact information provided on the github repo, and also specified in
the npm package.json

### Legal

Copyright Thomas Alrek (C) 2016

This module is released as GNU General Public License version 2, see file LICENSE.md for details. You are free to use this in your own applications.
However, the data gathered from NVDB is licensed under the NLOD license ([Norwegian](http://data.norge.no/nlod/no/1.0), [English](http://data.norge.no/nlod/en/1.0)).
If you use the data in your application, you are required by this license to always include the following text:

```
Inneholder data under norsk lisens for offentlige data (NLOD) tilgjengeliggjort av Statens vegvesen.
```
