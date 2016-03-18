/**
 * @package vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

var util = require("util");

/**
 * Logging utility with colors
 */
var log = {
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
 * @param string str
 * @returns string
 */
var toCamelCase = function(str){
    str = str.replace(/æ/g, 'a');
    str = str.replace(/Æ/g, 'a');
    str = str.replace(/ø/g, 'p');
    str = str.replace(/Ø/g, 'o');
    str = str.replace(/å/g, 'a');
    str = str.replace(/Å/g, 'a');
    str = str.replace(/[^\x00-\x7F]/g, "_");
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase()});
}

/**
 * Encodes variables to string
 * @param mixed str
 * @returns string
 */
var strEncode = function(str){
    switch(typeof str){
        case 'object':
            return JSON.stringify(str);
        case 'number':
            return str.toString();
        case 'array':
            throw 'Parameter cannot be Array';
        case 'string':
            return str;
        default:
            return str.toString();
    };
}

var isEmpty = function(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true && JSON.stringify(obj) === JSON.stringify({});
}

module.exports.log = log;
module.exports.toCamelCase = toCamelCase;
module.exports.strEncode = strEncode;
module.exports.isEmpty = isEmpty;