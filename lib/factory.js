/**
 * Function factory for main module
 *
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

module.exports = function(client){
    
    /* load helper lib */
    var Helpers = require("./helpers");

    /* assign helper functions to constants */
    const log = Helpers.log,
    toCamelCase = Helpers.toCamelCase,
    strEncode = Helpers.strEncode;
    
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
     * @param object value
     * @returns function
     */
    this.create = function(client, args, value){
        var fn;
        var url = value.href;
        var name = toCamelCase(value.navn);
        var fullName = name + "()";
        var deprecation = fullName + " is deprecated";
        var deprecated = false;

        if(typeof value.status !== 'undefined'){
            if(value.status === 'utgår'){
                deprecated = true;
            }
        }

        fn = function(obj, params, callback){
            if(deprecated){
                log.notice(deprecation);
            }
            var myurl = url;
            if (typeof obj === 'object') {
                obj.forEach(function (o) {
                    myurl = myurl + '/' + encodeURIComponent(strEncode(o));
                });
            }
            else if (typeof obj === 'function') {
                callback = obj;
            }
            if (typeof params === 'object' ) {
                var p = [];
                Object.keys(params).forEach(function (o) {
                    p.push(encodeURIComponent(strEncode(o)) + '=' + encodeURIComponent(strEncode(params[o])));
                });
                myurl = myurl + '?' + p.join('&');
            }
            else if (typeof params === 'function') {
                callback = params;
            }

            console.log("myurl: " + myurl);

            fnTemplate(client, args, myurl, callback);
        };

        return fn;
    };
    
};