/**
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

module.exports = function(client){
    
    var helpers = require("./helpers");
    var log = helpers.log;
    var _toCamelCase = helpers.toCamelCase;
    var _strEncode = helpers.strEncode;
    
    /**
     * Function template
     * @param string url
     * @param function callback
     */
    var fnTemplate = function(client, args, url, callback){
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
    
    /**
     * Creates functions for API urls
     * @param function fnTemplate
     * @param string apiEndpoint
     * @param object value
     * @returns function
     */
    this.create = function(client, args, apiEndpoint, value){
        var fn;
        var url = apiEndpoint + value.uri;
        var name = _toCamelCase(value.rel);
        var fullName = name + "()";
        var deprecation = fullName + " is deprecated";
        var deprecated = false;

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
                    url = url.replace(/{.+?}/g, function(){
                        return encodeURIComponent(_strEncode(params.shift())); 
                    });
                }
                fnTemplate(client, args, url, callback);
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
    
};