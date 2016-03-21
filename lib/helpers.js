/**
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

/* load required libs */
var util = require("util");

/**
 * Logging utility
 */
module.exports.log = {
    warning: function(msg){
        util.log("[WARNING]" + " " + msg);
    },
    error: function(msg){
        util.log("[ERROR]" + " " + msg);
    },
    notice: function(msg){
        util.log("[NOTICE]" + " " + msg);
    }
};

/**
 * Converts strings with dash to camelCase
 * and strips special characters
 * @param string str
 * @returns string
 */
module.exports.toCamelCase = function(str){
    str = str.replace(/æ/g, 'a');
    str = str.replace(/Æ/g, 'A');
    str = str.replace(/ø/g, 'o');
    str = str.replace(/Ø/g, 'O');
    str = str.replace(/å/g, 'a');
    str = str.replace(/Å/g, 'A');
    str = str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase()});
    return str.replace(/[\W_]+/g,"");
}

/**
 * Encodes variables to string
 * @param mixed str
 * @returns string
 */
module.exports.strEncode = function(str){
    switch(typeof str){
        case 'object':
            return JSON.stringify(str);
        case 'number':
            return str.toString();
        case 'array':
            throw 'Parameter cannot be Array';
            return false;
        case 'string':
            return str;
        case 'null':
            return "null";
        default:
            return str.toString();
    };
}

/**
 * Checks is an object is empty {}
 * @param obj obj
 */
module.exports.isEmpty = function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true && JSON.stringify(obj) === JSON.stringify({});
}