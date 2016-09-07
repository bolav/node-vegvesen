/**
 * Build script
 *
 * This script automatically bundles and minifies package.json
 * into a single file, located under ./dist
 * 
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */
 
"use strict";

var buildpackage = require("../package.json");
var buildpath = "./dist/";
//var bundlename = buildpackage.name + "-" + buildpackage.version;
var bundlename = buildpackage.name;
var bundler = require('browserify')();
var compressor = require("uglify-js");
var fs = require("fs");

var fullName = bundlename + "-" + buildpackage.version + ".js";
var minName = bundlename + "-" + buildpackage.version + ".min.js";

if (!fs.existsSync(buildpath)){
	fs.mkdirSync(buildpath);
}

var stream = fs.createWriteStream(buildpath + fullName);

stream.on('finish', function () {
	console.log("Building " + buildpath + minName);
	var result = compressor.minify("./" + buildpath + fullName, {
		outSourceMap: minName + ".map",
	});
	var minified = result.code;
	var sourcemap = JSON.parse(result.map);
	sourcemap.sources = [fullName];
	sourcemap = JSON.stringify(sourcemap);
	fs.writeFileSync(buildpath + minName , minified, 'utf8');
	console.log("Creating " + buildpath + minName + ".map");
	fs.writeFileSync(buildpath + minName + ".map", sourcemap, 'utf8');
});

console.log("Building " + buildpath + fullName);
bundler.add('./' + buildpackage.main);
bundler.bundle().pipe(stream);