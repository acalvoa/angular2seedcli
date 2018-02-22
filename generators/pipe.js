var capitalize = require('capitalize');

module.exports = function(name, pipe) {
    return "import { Pipe, PipeTransform } from '@angular/core';\n" +
        "/**\n" +
        "* This class represents the main pipe component.\n" +
        "*/\n" +
        "@Pipe({name: '" + pipe + "'})\n" +
        "export class " + capitalize(name) + "Pipe implements PipeTransform {\n" +
        "    transform(value:string, args:string[]) : any {\n" +
        "        return value;\n" +
        "    }\n" +
        "}\n";
}