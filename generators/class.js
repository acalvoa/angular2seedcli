var capitalize = require('capitalize');
module.exports = function(name){
	var retorno = "/*\n"+
	"* This class represents the class definition.\n"+
	"*/\n"+
	"export class "+capitalize(name)+" {\n"+
	"\t/* CONSTRUCTOR */\n"+
	"\tconstructor() {\n"+
	"\t}\n"+
	"\t\n"+
	"}";
	return retorno;
}