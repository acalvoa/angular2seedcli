var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var pipe = require('../generators/pipe');

module.exports = function(name, pipename){
	console.log("Creando Pipe "+name);
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
		console.log("El comando debe ejecutarse dentro de la ruta de un proyecto Angular Seed 2");
		shell.exit();
	}
	console.log("Ingresando al directorio del proyecto");
	shell.cd(ruta+"src/client/app");
	console.log("Creando el Pipe");
	if(shell.mkdir('pipes/'+name).code == 0){
		fs.writeFile('pipes/'+name+'/'+name+'.pipe.ts', pipe(name, pipename), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
		/*INGRESANDOLO AL MODULO*/
		shell.exec('cat pipes/pipes.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { NgModule }.*\n/g, "import { NgModule } from '@angular/core';\nimport { "+capitalize(name)+"Pipe } from './"+name+"/"+name+".pipe';\n");
			/*DECLARACIONES*/
			var comp = stdout.substring(stdout.indexOf("declarations:"), stdout.length-1);
			comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
			if(comp.trim() == ""){
				comp = comp+capitalize(name)+"Pipe";
			}
			else
			{
				comp = comp+", "+capitalize(name)+"Pipe";
			}
			comp = "declarations:["+comp+"]";
			stdout = stdout.replace(/declarations:.*]/g, comp);

			/*EXPORTS*/
			var comp = stdout.substring(stdout.indexOf("exports:"), stdout.length-1);
			comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
			if(comp.trim() == ""){
				comp = comp+capitalize(name)+"Pipe";
			}
			else
			{
				comp = comp+", "+capitalize(name)+"Pipe";
			}
			comp = "exports: ["+comp+"]";
			stdout = stdout.replace(/exports:.*]/g, comp);

			fs.writeFile("pipes/pipes.module.ts", stdout, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			});
		});
		console.log("Pipe Creado"); 
	}
	else{
		console.log("Ya se encuentra creado un pipe con el mismo nombre, por favor intente con otro nombre");
	}
};