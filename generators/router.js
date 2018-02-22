module.exports = function() {
    return "import { Route } from '@angular/router';\n" +
        "import { IndexComponent } from './index/index.component';\n" +
        "import { HomeComponent } from './home/home.component';\n\n" +
        "export const FeaturesRoutes: Route[] = [\n" +
        "    {\n" +
        "        path: '',\n" +
        "        pathMatch: 'full',\n" +
        "        redirectTo: 'home'\n" +
        "    },\n" +
        "    {\n" +
        "        path: '',\n" +
        "        component: IndexComponent,\n" +
        "        children: [\n" +
        "            {\n" +
        "                path: 'home',\n" +
        "                component: HomeComponent\n" +
        "            }\n" +
        "        ],\n" +
        "        //ROUTER CHILDREN LIMIT (NOT REMOVE - CLI COMPONENT)\n" +
        "        canActivate: []\n" +
        "    }\n" +
        "];\n";
}