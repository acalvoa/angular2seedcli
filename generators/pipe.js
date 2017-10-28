var capitalize = require('capitalize');
module.exports = function(name, pipe){
	var retorno = "import { Pipe, PipeTransform } from '@angular/core';\n"+
	"/**\n"+
	"* This class represents the main pipe component.\n"+
	"*/\n"+
	"@Pipe({name: '"+pipe+"'})\n"+
	"export class "+capitalize(name)+"Pipe implements PipeTransform {\n"+
	"\t/* MAIN TRANSFOMATION */\n"+
	"\ttransform(value:string, args:string[]) : any {\n"+
	"\t\treturn value;\n"+
	"\t}\n"+
	"}";
	return retorno;
}