import {Directive, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({standalone: true, selector: '[formControl][deshabilitar], [formControlName][deshabilitar]'})
export class DeshabilitarCtrlDirective
{
    constructor(private ngControl: NgControl)
    {
    }

    @Input('deshabilitar') set deshabilitar(condicion: boolean)
    {
        const control = this.ngControl.control;
        if (condicion)
        {
            control?.disable();
        } else
        {
            control?.enable();
        }
    }
}
