import {Directive, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    standalone: true,
    exportAs: 'CapitalizarDirective',
    selector: '[appCapitalizar]'
})
export class CapitalizarDirective
{
    @Input() capitalizar = false;

    constructor(private readonly control: NgControl)
    {
    }

    @HostListener('input', ['$event.target']) onInput(input: HTMLInputElement): void
    {
        const cambio = input.value.toLowerCase().replace(/\w\S*/g, w => (w.replace(/^\w/, (c) => c.toUpperCase())));
        this.control.control.setValue(cambio);
    }
}
