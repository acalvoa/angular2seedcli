var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var component = require('../generators/component');

module.exports = async function(name, route, child_route){
	console.log("Creating Feature "+name);
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
	console.log("Creating feature files");
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
			comp = "declarations: ["+comp+"]";
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
	        	stdout = "import { "+capitalize(name)+"Component } from './"+name+"/"+name+".component';\n"+stdout;
				stdout = stdout.replace(/}\n];/g, "},\n    {\n        path: '"+route+"',\n        component: "+capitalize(name)+"Component\n    }\n];");
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
					
					comp = comp+"            {\n                path: '"+child_route+"',\n                component: "+capitalize(name)+"Component\n            }";
				}
				else
				{
					comp = comp.substring(0,comp.length-3)+",\n            {\n                path: '"+child_route+"',\n                component: "+capitalize(name)+"Component\n            }";
				}
				comp = "children: ["+comp+"\n        ],\n";
				stdout1 = stdout.substring(0,stdout.indexOf("children:"));
				stdout2 = stdout.substring(stdout.indexOf('//ROUTER CHILDREN LIMIT (NOT REMOVE - CLI COMPONENT)'), stdout.length-1);
				fs.writeFile("features/features.routes.ts", stdout1+comp+"            "+stdout2, function(err) {
				    if(err) {
				        return console.log(err);
				    }
				});
			});
		}
		console.log("Feature created"); 
	}
	else{
		console.log("It already exists a feature with the same name, please try with other feature name");
	}
};