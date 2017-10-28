module.exports = function(){
	var retorno = "import { Route } from '@angular/router';\n"+
	"import { IndexComponent } from './index/index.component';\n"+
	"import { HomeComponent } from './home/home.component';\n\n"+
	"export const FeaturesRoutes: Route[] = [\n"+
    "\t{\n"+
    "\t\tpath: '',\n"+
    "\t\tpathMatch: 'full',\n"+
    "\t\tredirectTo: 'home'\n"+
  	"\t},\n"+
  	"\t{\n"+
    "\t\tpath: '',\n"+
    "\t\tcomponent: IndexComponent,\n"+
    "\t\tchildren: [\n"+
    "\t\t\t{\n"+
    "\t\t\t\tpath: 'home',\n"+
    "\t\t\t\tcomponent: HomeComponent\n"+
    "\t\t\t}\n"+
    "\t\t],\n"+
    "\t\t//ROUTER CHILDREN LIMIT (NOT REMOVE - CLI COMPONENT)\n"+
    "\t\tcanActivate: []\n"+
    "\t}\n"+
    "];";
    return retorno;
}