var capitalize = require('capitalize');
module.exports = function(name){
	var retorno = "import { Component } from '@angular/core';\n"+
	"/**\n"+
	"* This class represents the main application component.\n"+
	"*/\n"+
	"@Component({\n"+
	"\tmoduleId: module.id,\n"+
	"\tselector: 'sd-"+name+"',\n"+
	"\ttemplateUrl: '"+name+".component.html',\n"+
	"\tstyleUrls: ['"+name+".component.css'],\n"+
	"})\n"+
	"export class "+capitalize(name)+"Component {\n"+
	"\t/* CONSTRUCTOR */\n"+
	"\tconstructor() {\n"+
	"\t}\n"+
	"\t\n"+
	"}";
	return retorno;
}