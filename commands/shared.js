var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var component = require('../generators/component');

module.exports = function(name, route, child_route){
	console.log("Creating Shared Component "+name);
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
	console.log("Creating shared component files");
	if(shell.mkdir('shared/'+name).code == 0){
		fs.writeFile('shared/'+name+'/'+name+'.component.html', capitalize(name)+' Shared Component works!', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.touch('shared/'+name+'/'+name+'.component.scss');
		fs.writeFile('shared/'+name+'/'+name+'.component.ts', component(name), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
		/*INGRESANDOLO AL MODULO*/
		shell.exec('cat shared/shared.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { NgModule, ModuleWithProviders }.*\n/g, "import { NgModule, ModuleWithProviders } from '@angular/core';\nimport { "+capitalize(name)+"Component } from './"+name+"/"+name+".component';\n");
			/*DECLARACIONES*/
			var comp = stdout.substring(stdout.indexOf("declarations:"), stdout.length-1);
			comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
			if(comp.trim() == ""){
				comp = comp+capitalize(name)+"Component";
			}
			else
			{
				comp = comp+", "+capitalize(name)+"Component";
			}
			comp = "declarations:["+comp+"]";
			stdout = stdout.replace(/declarations:.*]/g, comp);

			/*EXPORTS*/
			var comp = stdout.substring(stdout.indexOf("exports:"), stdout.length-1);
			comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
			if(comp.trim() == ""){
				comp = comp+capitalize(name)+"Component";
			}
			else
			{
				comp = comp+", "+capitalize(name)+"Component";
			}
			comp = "exports: ["+comp+"]";
			stdout = stdout.replace(/exports:.*]/g, comp);

			fs.writeFile("shared/shared.module.ts", stdout, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			});
		});
		console.log("Shared Component Created"); 
	}
	else{
		console.log("It already exists a shared component with the same name, please try with other shared component name");
	}
};