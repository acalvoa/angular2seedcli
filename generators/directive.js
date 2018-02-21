var capitalize = require('capitalize');

module.exports = function(name, directive) {
    return "import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';\n" +
        "/**\n" +
        "* This class represents the main directive component.\n" +
        "*/\n" +
        "@Directive({ selector: \"[" +directive+"]\" })\n" +
        "export class " +capitalize(name)+"Directive implements OnInit {\n" +
        "    constructor(private elementRef: ElementRef){\n" +
        "    }\n" +
        "    ngOnInit() {\n" +
        "    }\n" +
        "    @HostListener('focus', ['$event.target.value'])\n" +
        "    onFocus(value:string) {\n" +
        "    }\n" +
        "    @HostListener('blur', ['$event.target.value'])\n" +
        "    onBlur(value:string) {\n" +
        "    }\n" +
        "    @HostListener('click', ['$event.target.value'])\n" +
        "    onClick(value:string) {\n" +
        "    }\n" +
        "}\n";
}