import {Directive, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[directive-mayusculas]'
})
export class MayusculasDirective
{
    @Input() mayusculas = false;

    constructor(private readonly control: NgControl)
    {
    }

    @HostListener('input', ['$event.tarjet']) onInput(input: HTMLInputElement): void
    {
        this.control.control.setValue(input.value.toUpperCase());
    }
}
