var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var classes = require('../generators/class');

module.exports = function(name, route, child_route){
	console.log("Creating Class "+name);
	var counter = 0;
	var ruta = "";
	while(counter < 6){
		var com = shell.exec('find '+ruta+'.as2cli',{
			silent: true
		});
		if(com.code == 1){
			ruta = ruta +"../";
			counter++;
			continue;
		}
		else
		{
			break;
		}
	}
	if(counter == 6){
		console.log("The command must be excecuted in the Angular Seed 2 project route.");
		shell.exit();
	}
	console.log("Entering to the project directory.");
	shell.cd(ruta+"src/client/app");
	console.log("Creating Class files");
	fs.writeFile('classes/'+name+'.ts', classes(name), function(err) {
	    if(err) {
	        console.log("It already exists a class with the same name, please try with other class name");
	    }
	    console.log("Class created"); 
	}); 
};