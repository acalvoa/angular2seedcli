var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var service = require('../generators/service');

module.exports = function(name){
	console.log("Creating Service "+name);
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
	console.log("Creating service files");
	if(shell.mkdir('services/'+name).code == 0){
		fs.writeFile('services/'+name+'/'+name+'.service.ts', service(name), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
		/*INGRESANDOLO AL MODULO*/
		shell.exec('cat services/services.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { NgModule }.*\n/g, "import { NgModule } from '@angular/core';\nimport { "+capitalize(name)+"Service } from './"+name+"/"+name+".service';\n");
			/*DECLARACIONES*/
			var comp = stdout.substring(stdout.indexOf("providers:"), stdout.length-1);
			comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
			if(comp.trim() == ""){
				comp = comp+capitalize(name)+"Service";
			}
			else
			{
				comp = comp+", "+capitalize(name)+"Service";
			}
			comp = "providers:["+comp+"]";
			stdout = stdout.replace(/providers:.*]/g, comp);

			fs.writeFile("services/services.module.ts", stdout, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			});
		});
		console.log("Service Created"); 
	}
	else{
		console.log("It already exists a service with the same name, please try with other service name");
	}
};