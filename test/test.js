var assert = require('assert');
var Vegvesen = require("../index.js");
var vegvesen = new Vegvesen();
describe('Vegvesen', function() {
	describe('Constructor', function () {
    	it('The new object should have a connect function', function () {
    		assert.equal(typeof vegvesen.connect, 'function');
    	});
  	});
	describe('API objects', function () {
    	it('After connect() the object should have 1 or more child objects', function () {
    		vegvesen.connect(function(){
    			var objects = 0;
    			for(obj in vegvesen){
    				if(typeof obj === 'object'){
    					objects++;
    				}
    			}
				assert.equal(objects > 0, true);
    		});
    	});
  	});
});

