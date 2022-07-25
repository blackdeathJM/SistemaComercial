import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appComponenteDinamico]'
})
export class ComponenteDinamicoDirective
{

    constructor(public refAlContenedor: ViewContainerRef)
    {
    }

}
