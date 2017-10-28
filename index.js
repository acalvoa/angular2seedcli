#!/usr/bin/env node
var program = require('commander');
var init = require('./commands/init');
var component = require('./commands/component');
var service = require('./commands/service');
var shared = require('./commands/shared');
var pipe = require('./commands/pipe');
var directive = require('./commands/directive');

program
.version('0.1.0')
.command('init <name>')
.action(function(name){
	init(name);
});

program
.command('generate <type> <name>')
.option("-r, --route [ruta]", "Define si el componente sera enrutado")
.option("-c, --childroute [ruta]", "Define si el componente sera enrutado como child del componente index")
.option("-p, --pipecall [pipe]", "Especifica el metodo de llamada del pipe")
.option("-d, --directive [selector]", "Especifica el selector que llama a la directiva")
.action(function(type,name, options){
	if(type == 'component'){
		component(name, options.route, options.childroute);
	}
	else if(type == 'service'){
		service(name);
	}
	else if(type == 'shared'){
		shared(name);
	}
	else if(type == 'pipe'){
		if(options.pipecall){
			pipe(name,options.pipecall);
		}
		else
		{
			console.log("No se ha especificado el callname del pipe.");
		}
	}
	else if(type == 'directive'){
		if(options.directive){
			directive(name,options.directive);
		}
		else
		{
			console.log("No se ha especificado el selector de la directiva.");
		}
	}
	else{
		console.log("El tipo de generador es erroneo service|shared|component|pipe|directive");
	}
	
});
program.parse(process.argv);
