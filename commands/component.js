var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var component = require('../generators/component');

module.exports = function(name, route, child_route){
	console.log("Creando Componente "+name);
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
	if(shell.mkdir('features/'+name).code == 0){
		fs.writeFile('features/'+name+'/'+name+'.component.html', capitalize(name)+' Component works!', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.touch('features/'+name+'/'+name+'.component.scss');
		fs.writeFile('features/'+name+'/'+name+'.component.ts', component(name), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
		/*INGRESANDOLO AL MODULO*/
		shell.exec('cat features/features.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { NgModule }.*\n/g, "import { NgModule } from '@angular/core';\nimport { "+capitalize(name)+"Component } from './"+name+"/"+name+".component';\n");
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

			fs.writeFile("features/features.module.ts", stdout, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			});
		});
		/* ENRUTAMOS EN CASO DE SER NECESARIO*/
		if(route){
			shell.exec('cat features/features.routes.ts', {
				silent: true
			},function(code, stdout, stderr){
	        	stdout = stdout.replace(/;\nexport const FeaturesRoutes/g, ";\nimport { "+capitalize(name)+"Component } from './"+name+"/"+name+".component';\nexport const FeaturesRoutes");
				stdout = stdout.replace(/}\n];/g, "},\n\t{\n\t\tpath: '"+route+"',\n\t\tcomponent: "+capitalize(name)+"Component\n\t}\n];");
				fs.writeFile("features/features.routes.ts", stdout, function(err) {
				    if(err) {
				        return console.log(err);
				    }
				});
			});
		}
		/**o una child route*/
		else if(child_route){
			shell.exec('cat features/features.routes.ts', {
				silent: true
			},function(code, stdout, stderr){
	        	stdout = stdout.replace(/;\nexport const FeaturesRoutes/g, ";\nimport { "+capitalize(name)+"Component } from './"+name+"/"+name+".component';\nexport const FeaturesRoutes");
				
				var comp = stdout.substring(stdout.indexOf("children:"), stdout.length-1);
				comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
				if(comp.trim() == ""){
					
					comp = comp+"\t\t\t{\n\t\t\t\tpath: '"+child_route+"',\n\t\t\t\tcomponent: "+capitalize(name)+"Component\n\t\t\t}";
				}
				else
				{
					comp = comp.substring(0,comp.length-3)+",\n\t\t\t{\n\t\t\t\tpath: '"+child_route+"',\n\t\t\t\tcomponent: "+capitalize(name)+"Component\n\t\t\t}";
				}
				comp = "children: ["+comp+"\n\t\t],\n";
				stdout1 = stdout.substring(0,stdout.indexOf("children:"));
				stdout2 = stdout.substring(stdout.indexOf('//ROUTER CHILDREN LIMIT (NOT REMOVE - CLI COMPONENT)'), stdout.length-1);
				fs.writeFile("features/features.routes.ts", stdout1+comp+"\t\t\t"+stdout2, function(err) {
				    if(err) {
				        return console.log(err);
				    }
				});
			});
		}
		console.log("Componente creado"); 
	}
	else{
		console.log("Ya se encuentra creado un componente con el mismo nombre, por favor intente con otro nombre");
	}
};