module.exports = function(api_endpoint){

    /* load required libs */
    var async = require("async");
    var Client = require('node-rest-client').Client;
    var helpers = require("./lib/helpers");
    var log = helpers.log;
    var _toCamelCase = helpers.toCamelCase;
    var _strEncode = helpers.strEncode;

    /**
     * Holds the API endpoint root url
     * @type String
     */
    var apiEndpoint;
    
    /* if api_endpoint arg was not supplied, we set it to default */
    if(typeof api_endpoint === 'undefined'){
        apiEndpoint = "https://www.vegvesen.no/nvdb/api";
    }else{
        apiEndpoint = api_endpoint;
    }
    
    /*
     * A reference variable to 'this'
     * @type module.exports
     */
    var _this = this;

    /**
     * Local node-rest-client variable
     * @type module.exports.Client
     */
    var client = new Client();
    
    /**
     * Header object
     * @type object
     */
    var args = {
        headers: { 
            "Accept": "application/vnd.vegvesen.nvdb-v1+json", 
            "Content-Type": "application/vnd.vegvesen.nvdb-v1+json; charset=utf-8"
        },
        requestConfig: {
            timeout: 1000,
            noDelay: true,
            keepAlive: true
        },
        responseConfig: {
            timeout: 1000 //response timeout 
	}
    };
    
    /**
     * Creates functions for API urls
     * @param object value
     * @returns function
     */
    function functionFactory(value){
        var fn;
        var url = apiEndpoint + value.uri;
        var name = _toCamelCase(value.rel);
        var fullName = name + "()";
        var deprecation = fullName + " is deprecated";
        var deprecated = false;
        
        /**
         * Function template
         * @param string url
         * @param function callback
         */
        function fnTemplate(url, callback){
            client.get(url, args, function(data, response){
                if(typeof data !== 'object'){
                    throw "Invalid data recieved from API endpoint";
                }
                var data = JSON.parse(data.toString());
                if(typeof callback !== 'undefined'){
                    if(typeof data !== 'undefined'){
                        callback(data);
                    }else{
                        callback();
                    }
                }
            });    
        };

        if(typeof value.status !== 'undefined'){
            if(value.status === 'utgår'){
                deprecated = true;
            }
        }

        if(/{.+?}/g.test(url)){
            fn = function(params, callback){
                if(deprecated){
                    log.notice(deprecation);
                }
                if(url.match(/{.+?}/g).length === 1){
                    url = url.replace(/{.+?}/g, function(){
                        return encodeURIComponent(_strEncode(params));
                    });
                }else{
                    if(typeof params !== 'array' && typeof params !== 'object'){
                        log.warning(fullName + ": multiple params must be array");
                        return;
                    }
                    if(params.length < url.match(/{.+?}/g).length){
                        log.warning(fullName + ": " + (url.match(/{.+?}/g).length - params.length) + " paramter(s) missing");
                        return;
                    }
                    url.replace(/{.+?}/g, function(){
                        return encodeURIComponent(_strEncode(params.shift())); 
                    });    
                }
                fnTemplate(url, callback);
            };
        }else{
            fn = function(callback){
                if(deprecated){
                    log.notice(deprecation);
                }
                fnTemplate(url, callback);
            };
        };

        return fn;
    };

    /**
     * Connect to the API endpoint, and fetch resources
     * @param function callback
     */
    this.connect = function(callback){
        
        client.get(apiEndpoint + '/', args, function(data, response){
            try{
                var data = JSON.parse(data.toString());
                async.forEachOf(
                    data.ressurser, 
                    function(value, key, _callback){
                        var node = _toCamelCase(value.rel);
                        var url = value.uri;
                        _this[node] = {};
                        client.get(apiEndpoint + url, args, function(data, response){
                            try{
                                var data = JSON.parse(data.toString());

                                async.forEachOf(
                                    data.ressurser, 
                                    function(value, key, __callback){
                                        _this[node][_toCamelCase(value.rel)] = functionFactory(value);
                                        __callback();
                                    }, 
                                    _callback
                                );
                        
                            }catch(e){
                                delete _this[node];
                                log.warning("API " + url + " is currently not available");
                                _callback();
                            }

                        });
                    }, 
                    callback
                );
            }catch(e){
                log.error(e.message);
            }
        }).on('error', function (err) {
            log.error('something went wrong on the request');
        });
        
    };
    
};