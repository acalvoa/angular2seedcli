var capitalize = require('capitalize');

module.exports = function(name) {
    return "import { Injectable } from '@angular/core';\n" +
        "import { Config } from '../../shared/config/env.config';\n" +
        "/**\n" +
        "* This class represents the service component.\n" +
        "*/\n" +
        "@Injectable()\n" +
        "export class " + capitalize(name) + "Service {\n" +
        "    constructor() {\n" +
        "    }\n" +
        "    \n" +
        "}\n";
}