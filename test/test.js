var assert = require('assert');
var expect = require('chai').expect;
var Vegvesen = require("../index.js");
var vegvesen = new Vegvesen();
var Helpers = require("../lib/helpers.js");

describe('Helpers', function() {
    describe('toCamelCase', function () {
        it('Test case #1', function () {
            assert.equal(Helpers.toCamelCase("this-is-a-test#-æøå"), 'thisIsATestAoa');
        });
        it('Test case #2', function () {
            assert.equal(Helpers.toCamelCase("this_i      s #&/$&$) -a-test-æøå"), 'thisisATestAoa');
        });
    });
    describe('strEncode', function (){
        it('Object', function () {
            assert.equal(Helpers.strEncode({test: "object"}), '{"test":"object"}');
        });
        it('Number', function () {
            assert.equal(Helpers.strEncode(5163), '5163');
        });
        it('Null', function () {
            assert.equal(Helpers.strEncode(null), "null");
        }); 
        it('String', function () {
            assert.equal(Helpers.strEncode("string"), "string");
        }); 
        it('Throw Error', function () {
            expect(Helpers.strEncode.bind([0,1,2,3])).to.throw(Error);
        });
        it('Throw TypeError', function () {
            expect(Helpers.strEncode).to.throw(TypeError);
        });
    });
});

describe('Vegvesen', function() {
	describe('Constructor', function () {
    	it('Object constructed', function () {
    		assert.equal(typeof vegvesen.connect, 'function');
    	});
  	});
	describe('Connect', function () {
    	it('Connect successful', function () {
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

