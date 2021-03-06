#!/usr/bin/env node
var program = require('commander');
var init = require('./commands/init');
var feature = require('./commands/feature');
var service = require('./commands/service');
var shared = require('./commands/shared');
var pipe = require('./commands/pipe');
var directive = require('./commands/directive');
var classes = require('./commands/classes');
var isGitUrl = require('is-git-url');

program
.version('0.2.0')
.command('init <name>')
.option("-f, --fast", "Omit the install of vendor components with npm install.")
.option("-g, --git [path]", "Add a git repository to project and stash with a new branch.")
.action(function(name, options){
	if(typeof options.git == 'string' && !isGitUrl(options.git)){
		console.log("The git url must be a valid git repository.");
	}
	else{
		init(name, options.fast, options.git);
	}
});

program
.command('generate <type> <name>')
.option("-r, --route [ruta]", "Define the feature route.")
.option("-c, --childroute [ruta]", "Define the route into Index component like a child route.")
.option("-p, --pipecall [pipe]", "Define the pipe callname for html templates.")
.option("-d, --directive [selector]", "Define the selector name to call directive.")
.action(function(type,name, options){
	if(type == 'feature'){
		feature(name, options.route, options.childroute);
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
			console.log("Callname pipe is not specified.");
		}
	}
	else if(type == 'directive'){
		if(options.directive){
			directive(name,options.directive);
		}
		else
		{
			console.log("Directive selector is not specified.");
		}
	}
	else if(type == 'class'){
		classes(name);
	}
	else{
		console.log("The generator type is incorrect, use service|shared|feature|pipe|directive");
	}
	
});
program.parse(process.argv);
