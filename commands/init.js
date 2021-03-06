var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var component = require('../generators/component');
var flags = 0;
module.exports = function(name, fast, git){
	console.log("Creating Angular Project "+name);
    if (!shell.which('git')) {
	  shell.echo('Sorry, this script requires git');
	  shell.exit(1);
	}
	if(shell.exec('git clone https://github.com/mgechev/angular-seed.git '+name).code == 0){
		shell.touch(name+'/.as2cli');
		shell.exec('echo '+name+' > '+name+'/.as2cli');
		shell.touch(name+'/CHANGELOG');
		shell.exec('echo "# Changelog" > '+name+'/CHANGELOG');
		shell.cd(name);
		console.log('Removing base git project... ');
		shell.rm('-rf', '.git');
		
		if(git){
			console.log("Initializing git project");
			shell.exec('git init');
			shell.exec('git add *');
			shell.exec('git commit -u -m "initial commit"');
			shell.exec('git branch as2cli');
			shell.exec('git checkout as2cli');
		}

		console.log("Creating folder structure...");
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
		console.log("Creating module structure...");
		shell.exec('cat shared/shared.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/\nimport { ToolbarComponent }.*\n/g, '');
			stdout = stdout.replace(/import { NavbarComponent }.*\n/g, '');
			stdout = stdout.replace(/import { NameListService }.*\n/g, '');
			stdout = stdout.replace("declarations: [ToolbarComponent, NavbarComponent],", 'declarations: [],',"gi");
			stdout = stdout.replace("\n    CommonModule, FormsModule, RouterModule]", "", "gi");
			stdout = stdout.replace("exports: [ToolbarComponent, NavbarComponent,", "exports: [CommonModule, FormsModule, RouterModule]", "gi");
			stdout = stdout.replace("providers: [NameListService]", "providers: []", "gi");
			fs.writeFile("shared/shared.module.ts", stdout, function(err) {
				flags = flags + 1;

			    if(err) {
			        return console.log(err);
			    }
			}); 
		});
		//CREAMOS LOS MODULOS INTERNOS
		fs.writeFile("app.module.ts", appmodules(), function(err) {
			flags = flags + 1;
		    if(err) {
		        return console.log(err);
		    }
		}); 
		fs.writeFile("services/services.module.ts", modules('Services', true, false, false, false), function(err) {
			flags = flags + 1;
		    if(err) {
		        return console.log(err);
		    }
		}); 
		fs.writeFile("features/features.module.ts", modules('Features', false, true, true, true), function(err) {
			flags = flags + 1;
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
				comp = "declarations: ["+comp+"]";
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
			flags = flags + 1;
		    if(err) {
		        return console.log(err);
		    }
		}); 
		fs.writeFile("directives/directives.module.ts", modules('Directives', false, true, false, false), function(err) {
			flags = flags + 1;
		    if(err) {
		        return console.log(err);
		    }
		}); 
		//RUTAS
		console.log("Generating Router Paths...");
		fs.writeFile("features/features.routes.ts", routers(), function(err) {
			flags = flags + 1;
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.exec('cat app-routing.module.ts', {
			silent: true
		},function(code, stdout, stderr){
			stdout = stdout.replace(/import { RouterModule.*\n/g, "import { RouterModule } from '@angular/router';\nimport { FeaturesRoutes } from './features/features.routes';\n");
			stdout = stdout.replace(/\*\//g, '*/\n      ...FeaturesRoutes\n');
			fs.writeFile("app-routing.module.ts", stdout, function(err) {
				flags = flags + 1;

			    if(err) {
			        return console.log(err);
			    }
			}); 
		});
		/*GENERADO COMPONENT*/
		console.log("Generating base components");
		fs.writeFile("app.component.html", '<router-outlet></router-outlet>', function(err) {
			flags = flags + 1;
			if(err) {
		        return console.log(err);
		    }
		}); 
		shell.mkdir('features/home');
		shell.touch('features/home/home.component.html');
		shell.touch('features/home/home.component.scss');
		fs.writeFile("features/home/home.component.ts", component('home'), function(err) {
			flags = flags + 1;
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.mkdir('features/index');
		fs.writeFile("features/index/index.component.html", '<router-outlet></router-outlet>', function(err) {
			flags = flags + 1;
		    if(err) {
		        return console.log(err);
		    }
		}); 
		shell.touch('features/index/index.component.scss');
		fs.writeFile("features/index/index.component.ts", component('index'), function(err) {
			flags = flags + 1;
			if(err) {
		        return console.log(err);
		    }
		});
		function gitcall (){
			if(typeof git === 'string'){
				if(flags === 12){
					console.log("Set Angular Seed cli project into commits");
					shell.cd('../../..');
					shell.exec('git add *');
					shell.exec('git add .as2cli .docker/Dockerfile_dev .docker/Dockerfile_prod .docker/nginx.conf .dockerignore .editorconfig .github/CONTRIBUTING.md');
					shell.exec('git add .github/ISSUE_TEMPLATE.md .gitignore .travis.yml .vscode/launch.json .vscode/settings.json .vscode/tasks.json src/client/css/main.scss');
					shell.exec('git commit -a -m "setting angular 2 seed cli project"');
					console.log("Add git remote origin");
					shell.exec('git remote add origin '+git);
					shell.exec('git checkout master');
					shell.rm('-rf', '*');
					shell.exec('git commit -a -m "clean master"');
					shell.exec('git fetch origin');
					shell.exec('git pull origin master');
					shell.exec('git checkout as2cli');
				}
				else{
					setTimeout(function(){
						gitcall();
					}, 1000);
				}
			}
		}
		gitcall();

		if(!fast){
			console.log("Installing vendor components  (if you need omit this step run as2cli with --fast option)");
			shell.exec('npm install', {
				silent: true
			},function(code, stdout, stderr){
				console.log("Components installed.");
			});
		}
	}
}