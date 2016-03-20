/**
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

module.exports = function(api_endpoint, options){

    /* load required libs */
    var async = require("async");
    var Client = require('node-rest-client').Client;
    var helpers = require("./lib/helpers");
    var Factory = require("./lib/factory");
    var log = helpers.log;
    var _toCamelCase = helpers.toCamelCase;
    var isEmpty = helpers.isEmpty;

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
     * Local function factory object
     * @type module.exports.Factory
     */
    var factory = new Factory();
    
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
     * if options are provided, add them to args
     */
    if(typeof options === 'object'){
        if(typeof options.requestConfig === 'object'){
            args.requestConfig = options.requestConfig;
        }
        if(typeof options.responseConfig === 'object'){
            args.responseConfig = options.responseConfig;
        }   
    }

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
                                        _this[node][_toCamelCase(value.rel)] = factory.create(client, args, apiEndpoint, value);
                                        __callback();
                                    }, 
                                    _callback
                                );
                            }catch(e){
                                delete _this[node];
                                log.warning("API " + url + " is currently not available");
                                _callback();
                            };
                        });
                    }, 
                    function(){
                        /* Remove empty API nodes */
                        Object.keys(_this).forEach(function(key,index){
                            if(isEmpty(_this[key])){
                                delete _this[key];
                            };
                        });
                        if(typeof callback !== 'undefined'){
                            callback();
                        };
                    }
                );
            }catch(e){
                log.error(e.message);
            }
        }).on('error', function (err) {
            log.error('something went wrong on the request');
        });
    };
};