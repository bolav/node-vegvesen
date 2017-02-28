/**
 * Main module 
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var Vegvesen = function(api_endpoint, options){

    /* load required libs */
    var async = require("async"),
    Client = require('node-rest-client').Client,
    Helpers = require("./lib/helpers"),
    Factory = require("./lib/factory");

    /* assign helper functions to constants */
    const log = Helpers.log,
    toCamelCase = Helpers.toCamelCase,
    isEmpty = Helpers.isEmpty;

    /**
     * Holds the API endpoint root url
     * @type String
     */
    var apiEndpoint;
    
    /**
     * A reference variable to 'this'
     * @type module.exports
     */
    var self = this;

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
            "Accept": "application/vnd.vegvesen.nvdb-v2+json",
            "X-Client": "vegvesen npm 0.3.1"
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

    /* if api_endpoint arg was not supplied, we set it to default */
    if(typeof api_endpoint === 'undefined'){
        apiEndpoint = "https://www.vegvesen.no/nvdb/api/v2";
    }else{
        apiEndpoint = api_endpoint;
    }

    /**
     * Connect to the API endpoint, and fetch resources
     * @param function callback
     */
    this.connect = function(callback){
        client.get(apiEndpoint + '/', args, function(data, response){
            try{
                var data = JSON.parse(data.toString());
                data.forEach(function(obj,index){
                    var node = toCamelCase(obj.navn);
                    var url = obj.href;
                    self[node] = factory.create(client, args, obj);
                });
                if(typeof callback !== 'undefined'){
                    callback();
                };
            }catch(e){
                log.error(e.message);
            }
        }).on('error', function (err) {
            log.error('something went wrong on the request');
        });
    };

};

module.exports = Vegvesen;

/*
if(typeof window !== 'undefined'){
    window.Vegvesen = Vegvesen;
}*/