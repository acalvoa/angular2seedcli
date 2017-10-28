var capitalize = require('capitalize');
module.exports = function(name, directive){
	var retorno = "import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';\n"+
	"/**\n"+
	"* This class represents the main directive component.\n"+
	"*/\n"+
	"@Directive({ selector: \"["+directive+"]\" })\n"+
	"export class "+capitalize(name)+"Directive implements OnInit {\n"+
	"\t/* MAIN DIRECTIVE */\n"+
	"\tconstructor(private elementRef: ElementRef){\n"+
	"\t}\n"+
	"\tngOnInit() {\n"+
	"\t}\n"+
	"\t@HostListener('focus', ['$event.target.value'])\n"+
	"\tonFocus(value:string) {\n"+
	"\t}\n"+
	"\t@HostListener('blur', ['$event.target.value'])\n"+
	"\tonBlur(value:string) {\n"+
	"\t}\n"+
	"\t@HostListener('click', ['$event.target.value'])\n"+
	"\tonClick(value:string) {\n"+
	"\t}\n"+
	"}";
	return retorno;
}	