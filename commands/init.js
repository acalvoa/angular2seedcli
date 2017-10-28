var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var component = require('../generators/component');

module.exports = function(name){
	console.log("Creando Proyecto Angular "+name);
    if (!shell.which('git')) {
	  shell.echo('Sorry, this script requires git');
	  shell.exit(1);
	}
	if(shell.exec('git clone git@github.com:mgechev/angular-seed.git '+name).code == 0){
		shell.touch(name+'/.as2cli');
		shell.exec('echo '+name+' > '+name+'/.as2cli')
		console.log("Creando Estructura de Directorios");
		shell.cd(name);
		shell.cd('src/client/app');
		shell.mkdir('features');
		shell.mkdir('services');
		shell.mkdir('pipes');
		shell.mkdir('classes');
		shell.mkdir('directives');
		shell.rm('-rf', 'about');
		shell.rm('-rf', 'home');
		shell.rm('-rf', 'shared/name-list');
		shell.rm('-rf', 'shared/navbar');
		shell.rm('-rf', 'shared/toolbar');
		shell.mv('app.component.css', 'app.component.scss');
		shell.mv('../css/main.css', '../css/main.scss');
		console.log("Creando Estructura de Modulos");
		shell.exec('cat shared/shared.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { ToolbarComponent }.*\n/g, '');
			stdout = stdout.replace(/import { NavbarComponent }.*\n/g, '');
			stdout = stdout.replace(/import { NameListService }.*\n/g, '');
			stdout = stdout.replace("declarations: [ToolbarComponent, NavbarComponent],",'declarations: [],',"gi");
			stdout = stdout.replace("declarations: [ToolbarComponent, NavbarComponent],",'declarations: [],',"gi");
			stdout = stdout.replace("CommonModule, FormsModule, RouterModule]", "", "gi");
			stdout = stdout.replace("exports: [ToolbarComponent, NavbarComponent,", "exports: [CommonModule, FormsModule, RouterModule],", "gi");
			stdout = stdout.replace("providers: [NameListService]", "providers: []", "gi");
			fs.writeFile("shared/shared.module.ts", stdout, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			}); 
		});
		//CREAMOS LOS MODULOS INTERNOS
		fs.writeFile("app.module.ts", appmodules(), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		fs.writeFile("services/services.module.ts", modules('Services', true, false, false, false), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		fs.writeFile("features/features.module.ts", modules('Features', false, true, true, true), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    /*MODIFICANDO EL MODULO*/
			shell.exec('cat features/features.module.ts', {
				silent: true
			},function(code, stdout, stderr){
				stdout = stdout.replace(/import { NgModule }.*\n/g, "import { NgModule } from '@angular/core';\nimport { HomeComponent } from './home/home.component';\nimport { IndexComponent } from './index/index.component';\n");
				/*DECLARACIONES*/
				var comp = stdout.substring(stdout.indexOf("declarations:"), stdout.length-1);
				comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
				if(comp.trim() == ""){
					comp = comp+"HomeComponent, IndexComponent";
				}
				else
				{
					comp = comp+", HomeComponent, IndexComponent";
				}
				comp = "declarations:["+comp+"]";
				stdout = stdout.replace(/declarations:.*]/g, comp);

				/*EXPORTS*/
				var comp = stdout.substring(stdout.indexOf("exports:"), stdout.length-1);
				comp = comp .substring(comp.indexOf("[")+1,comp.indexOf("]"));
				if(comp.trim() == ""){
					comp = comp+"HomeComponent, IndexComponent";
				}
				else
				{
					comp = comp+", HomeComponent, IndexComponent";
				}
				comp = "exports: ["+comp+"]";
				stdout = stdout.replace(/exports:.*]/g, comp);
				fs.writeFile("features/features.module.ts", stdout, function(err) {
				    if(err) {
				        return console.log(err);
				    }
				});
			});
		}); 
		fs.writeFile("pipes/pipes.module.ts", modules('Pipes', false, true, false, false), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		fs.writeFile("directives/directives.module.ts", modules('Directives', false, true, false, false), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		//RUTAS
		console.log("Generando Enrutadores");
		fs.writeFile("features/features.routes.ts", routers(), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.exec('cat app-routing.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { RouterModule.*\n/g, "import { RouterModule } from '@angular/router';\nimport { FeaturesRoutes } from './features/features.routes';\n");
			stdout = stdout.replace(/\*\//g, '*/\n\t\t...FeaturesRoutes\n');
			fs.writeFile("app-routing.module.ts", stdout, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			}); 
		});
		/*GENERADO COMPONENT*/
		console.log("Generando Componentes base");
		fs.writeFile("app.component.html", '<router-outlet></router-outlet>', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.mkdir('features/home');
		shell.touch('features/home/home.component.html');
		shell.touch('features/home/home.component.scss');
		fs.writeFile("features/home/home.component.ts", component('home'), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.mkdir('features/index');
		fs.writeFile("features/index/index.component.html", '<router-outlet></router-outlet>', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.touch('features/index/index.component.scss');
		fs.writeFile("features/index/index.component.ts", component('index'), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 

		console.log("Instalando componentes");
		shell.exec('npm install', {
			silent: true
		},function(code, stdout, stderr){
			console.log("Componentes instalados");
		});
	}
}