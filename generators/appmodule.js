var capitalize = require('capitalize');

module.exports = function getModule() {
    return "import { NgModule } from '@angular/core';\n" +
        "import { BrowserModule } from '@angular/platform-browser';\n" +
        "import { APP_BASE_HREF } from '@angular/common';\n" +
        "import { HttpClientModule } from '@angular/common/http';\n" +
        "import { AppComponent } from './app.component';\n" +
        "import { AppRoutingModule } from './app-routing.module';\n" +
        "\n" +
        "import { ServicesModule } from './services/services.module';\n" +
        "import { FeaturesModule } from './features/features.module';\n" +
        "import { PipesModule } from './pipes/pipes.module';\n" +
        "import { DirectivesModule } from './directives/directives.module';\n" +
        "import { SharedModule } from './shared/shared.module';\n" +
        "\n" +
        "@NgModule({\n" +
        "    imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule.forRoot(),\n" +
        "        ServicesModule, FeaturesModule, PipesModule, DirectivesModule],\n" +
        "    declarations: [AppComponent],\n" +
        "    providers: [{\n" +
        "        provide: APP_BASE_HREF,\n" +
        "        useValue: '<%= APP_BASE %>'\n" +
        "    }],\n" +
        "    bootstrap: [AppComponent]\n" +
        "})\n" +
        "export class AppModule { }\n";
}
