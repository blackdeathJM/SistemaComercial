import {Directive, HostListener, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[directive-capitalizar]'
})
export class CapitalizarDirective
{
    @Input() capitalizar = false;

    constructor(private readonly control: NgControl)
    {
    }

    @HostListener('input', ['$event.tarjet']) onInput(input: HTMLInputElement): void
    {
        const caretPos = input.selectionStart;
        if (!this.capitalizar)
        {
            this.control.control.setValue(input.value.toUpperCase());
        } else
        {
            this.control.control.setValue(input['value'].replace(/\b\w/g, c => c.toUpperCase()));
        }
        input.setSelectionRange(caretPos, caretPos);
    }
}
