import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    standalone: true,
    exportAs: 'ComponenteDinamicoDirective',
    selector: '[appComponenteDinamico]'
})
export class ComponenteDinamicoDirective
{

    constructor(public refAlContenedor: ViewContainerRef)
    {
    }

}
