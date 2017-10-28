var shell = require('shelljs');
var fs = require('fs');
var capitalize = require('capitalize');
var modules = require('../generators/modules');
var appmodules = require('../generators/appmodule');
var routers = require('../generators/router');
var classes = require('../generators/class');

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
	console.log("Creando la clase");
	fs.writeFile('classes/'+name+'.ts', classes(name), function(err) {
	    if(err) {
	        console.log("Ya se encuentra creada una clase con el mismo nombre, por favor intente con otro nombre");
	    }
	    console.log("Clase creada"); 
	}); 
};