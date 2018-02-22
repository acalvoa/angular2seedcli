var capitalize = require('capitalize');

module.exports = function(name) {
    return "/*\n" +
        "* This class represents the class definition.\n" +
        "*/\n" +
        "export class " + capitalize(name) + " {\n" +
        "    constructor() {\n" +
        "    }\n" +
        "    \n" +
        "}\n";
}