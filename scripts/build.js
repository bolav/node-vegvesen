/**
 * Build script
 *
 * This script automatically bundles and minifies package.json
 * into a single file, located under ./dist
 * 
 * @package node-vegvesen
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */
 
"use strict";

var buildpackage = require("../package.json");
var buildpath = "./dist/";
var bundlename = buildpackage.name;
var bundler = require('browserify')();
var compressor = require("uglify-js");
var fs = require("fs");
var path = require("path");
var startDate = new Date();

var fullStatus = false;
var minStatus = false;
var mapStatus = false;

var fullName = bundlename + "-" + buildpackage.version + ".js";
var minName = bundlename + "-" + buildpackage.version + ".min.js";

function clean(dir) {
	try {
		var files = fs.readdirSync(dir); 
	}catch(e) {
		return;
	}
	if (files.length > 0){
		process.stdout.write(" > Build path is not clean, cleaning... ");
		try{
			for (var i = 0; i < files.length; i++) {
				var filePath = dir + files[i];
				if (fs.statSync(filePath).isFile()){
					fs.unlinkSync(filePath);	
				}else{
					rmDir(filePath);	
				}
			}
			process.stdout.write("  [Done]\n");
		}catch(ex){
			process.stdout.write("  [Failed]\n");
		}		
	}else{
		console.log(" > Build path is clean");
	}
};

function buildStatus(){
	if(!fullStatus || !minStatus || !mapStatus){
		console.log("\n WARNING The following tasks failed:\n");
		if(!fullStatus){
			console.log(" * " + fullName);
		}
		if(!minStatus){
			console.log(" * " + minName);
		}
		if(!mapStatus){
			console.log(" * " + fullName + ".map");
		}
	}
}

console.log(" Build of package " + buildpackage.name + "@" + buildpackage.version + " started " + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds() + "\n");
console.log(" > Build path is \"" + path.resolve(buildpath) + "\"");
clean(buildpath);
if (!fs.existsSync(buildpath)){
	fs.mkdirSync(buildpath);
}

var stream = fs.createWriteStream(buildpath + fullName);

stream.on('finish', function () {
	process.stdout.write("         [Done]\n");
	fullStatus = true;
	process.stdout.write(" * Building " + minName + "... ");
	try{
		var result = compressor.minify("./" + buildpath + fullName, {
			outSourceMap: minName + ".map",
		});
		var minified = result.code;
		var sourcemap = JSON.parse(result.map);
		sourcemap.sources = [fullName];
		sourcemap = JSON.stringify(sourcemap);
		fs.writeFileSync(buildpath + minName , minified, 'utf8');
		process.stdout.write("     [Done]\n");
		minStatus = true;
	}catch(ex){
		process.stdout.write("     [Failed]\n");
		minStatus = false;
	}
	process.stdout.write(" * Building " + minName + ".map... ");
	if(minStatus){
		try{
			fs.writeFileSync(buildpath + minName + ".map", sourcemap, 'utf8');
			process.stdout.write(" [Done]\n");
			mapStatus = true;
		}catch(ex){
			process.stdout.write(" [Failed]\n");
			mapStatus = false;	
		}
	}else{
		process.stdout.write(" [Skipped]\n");
	}
	buildStatus();
	var endDate = new Date();
	var buildTime = (endDate.getTime() - startDate.getTime()) / 1000;
	console.log("\n Build of package " + buildpackage.name + "@" + buildpackage.version + " completed in " + buildTime.toFixed(1) + " second(s)");
});

stream.on('error', function(){
	buildStatus();
});

process.stdout.write(" * Building " + fullName + "... ");
try{
	bundler.add('./' + buildpackage.main);
	bundler.bundle().pipe(stream);
}catch(ex){
	process.stdout.write("         [Failed]\n");
	console.log(" * Building " + minName + "...      [Skipped]");
	console.log(" * Building " + minName + ".map...  [Skipped]");
	fullStatus = false;
	buildStatus();
}