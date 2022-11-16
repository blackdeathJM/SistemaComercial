import {Directive, ElementRef, HostListener, Renderer2, Self} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    standalone: true,
    exportAs: 'TrimDirective',
    selector: '[appTrim]'
})
export class TrimDirective
{

    constructor(private renderer: Renderer2, private elementRef: ElementRef, @Self() private ngControl: NgControl)
    {
    }

    @HostListener('blur')
    onBlur(): void
    {
        let value = this.elementRef.nativeElement.value;

        if (value)
        {
            value = value.trim();
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
            this.renderer.setAttribute(this.elementRef.nativeElement, 'value', value);
            this.ngControl.control.setValue(value);
        } else
        {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', null);
            this.renderer.setAttribute(this.elementRef.nativeElement, 'value', null);
            this.ngControl.control.setValue(value);
        }
    }
}
