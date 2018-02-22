var capitalize = require('capitalize');

module.exports = function(name) {
    return "import { Component } from '@angular/core';\n" +
        "/**\n" +
        "* This class represents the main application component.\n" +
        "*/\n" +
        "@Component({\n" +
        "    moduleId: module.id,\n" +
        "    selector: 'sd-" + name + "',\n" +
        "    templateUrl: '" + name + ".component.html',\n" +
        "    styleUrls: ['" + name + ".component.css'],\n" +
        "})\n" +
        "export class " + capitalize(name) + "Component {\n" +
        "    constructor() {}\n" +
        "}\n";
}