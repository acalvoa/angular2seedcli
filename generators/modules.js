var capitalize = require('capitalize');
module.exports = function getModule(name, providers, shared, pipes, directives){
	var retorno = "import { NgModule } from '@angular/core';\n"+
	"import { CommonModule } from '@angular/common';\n"+
	"import { FormsModule } from '@angular/forms';\n"+
	"import { RouterModule } from '@angular/router';\n";
	if(shared) retorno = retorno+"import { SharedModule } from '../shared/shared.module';\n";
	if(pipes) retorno = retorno+"import { PipesModule } from '../pipes/pipes.module';\n";
	if(directives) retorno = retorno+"import { DirectivesModule } from '../directives/directives.module';\n";
	retorno = retorno+"/**\n"+
	"* Especificamos el modulo\n"+
	"*/\n"+
	"\n"+
	"@NgModule({\n";
	var modules = "CommonModule, RouterModule";
	if(shared) modules = modules+", SharedModule";
	if(pipes) modules = modules+", PipesModule";
	if(directives) modules = modules+", DirectivesModule";
	retorno = retorno+"\timports: ["+modules+"],\n";
	retorno = retorno+"\tdeclarations: [],\n";
	if(providers) retorno = retorno+"\tproviders: [],\n";
	retorno = retorno+"\texports: [CommonModule, FormsModule, RouterModule]\n"+
	"\n"+
	"})\n"+
	"export class "+capitalize(name)+"Module {\n"+
	"}";
	return retorno;
}