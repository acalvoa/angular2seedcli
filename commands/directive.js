var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var directive = require('../generators/directive');

module.exports = function(name, directivename){
	console.log("Creando Directiva "+name);
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
	console.log("Creando el componente");
	if(shell.mkdir('directives/'+name).code == 0){
		fs.writeFile('directives/'+name+'/'+name+'.directive.ts', directive(name, directivename), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
		/*INGRESANDOLO AL MODULO*/
		shell.exec('cat directives/directives.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { NgModule }.*\n/g, "import { NgModule } from '@angular/core';\nimport { "+capitalize(name)+"Directive } from './"+name+"/"+name+".directive';\n");
			/*DECLARACIONES*/
			var comp = stdout.substring(stdout.indexOf("declarations:"), stdout.length-1);
			comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
			if(comp.trim() == ""){
				comp = comp+capitalize(name)+"Directive";
			}
			else
			{
				comp = comp+", "+capitalize(name)+"Directive";
			}
			comp = "declarations:["+comp+"]";
			stdout = stdout.replace(/declarations:.*]/g, comp);

			/*EXPORTS*/
			var comp = stdout.substring(stdout.indexOf("exports:"), stdout.length-1);
			comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
			if(comp.trim() == ""){
				comp = comp+capitalize(name)+"Directive";
			}
			else
			{
				comp = comp+", "+capitalize(name)+"Directive";
			}
			comp = "exports: ["+comp+"]";
			stdout = stdout.replace(/exports:.*]/g, comp);

			fs.writeFile("directives/directives.module.ts", stdout, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			});
		});
		console.log("Directiva Creada"); 
	}
	else{
		console.log("Ya se encuentra creado una directiva con el mismo nombre, por favor intente con otro nombre");
	}
};