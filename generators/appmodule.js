var capitalize = require('capitalize');
module.exports = function getModule(){
	return "import { NgModule } from '@angular/core';\n"+
	"import { BrowserModule } from '@angular/platform-browser';\n"+
	"import { APP_BASE_HREF } from '@angular/common';\n"+
	"import { HttpModule } from '@angular/http';\n"+
	"import { AppComponent } from './app.component';\n"+
	"import { AppRoutingModule } from './app-routing.module';\n"+
	"\n"+
	"import { ServicesModule } from './services/services.module';\n"+
	"import { FeaturesModule } from './features/features.module';\n"+
	"import { PipesModule } from './pipes/pipes.module';\n"+
	"import { DirectivesModule } from './directives/directives.module';\n"+
	"import { SharedModule } from './shared/shared.module';\n"+
	"\n"+
	"\n"+
	"@NgModule({\n"+
	"\timports: [BrowserModule, HttpModule, AppRoutingModule, SharedModule.forRoot(),\n"+
	"\tServicesModule, FeaturesModule, PipesModule, DirectivesModule],\n"+
	"\tdeclarations: [AppComponent],\n"+
	"\tproviders: [{\n"+
	"\t\tprovide: APP_BASE_HREF,\n"+
	"\tuseValue: '<%= APP_BASE %>'\n"+
	"\t}],\n"+
	"\tbootstrap: [AppComponent]\n"+
	"\n"+
	"})\n"+
	"export class AppModule { }";
}

