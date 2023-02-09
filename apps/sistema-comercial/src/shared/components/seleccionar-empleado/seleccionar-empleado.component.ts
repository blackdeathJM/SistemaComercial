import {Component, forwardRef, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';

@Component({
    selector: 'app-seleccionar-empleado',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatSelectModule],
    templateUrl: './seleccionar-empleado.component.html',
    styleUrls: ['./seleccionar-empleado.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SeleccionarEmpleadoComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SeleccionarEmpleadoComponent),
            multi: true
        }
    ]
})
export class SeleccionarEmpleadoComponent implements ControlValueAccessor
{
    @Input() multiple: boolean = false;
    valor: any;
    cambio: (v: any) => void;
    tocado: () => void;
    estaDeshabilitado: boolean;

    constructor(public entityEmpleado: EntityEmpleadoStore)
    {
    }

    writeValue(obj: any): void
    {
        this.valor = obj;
    }

    registerOnChange(fn: any): void
    {

        this.cambio = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.tocado = fn;
    }

    setDisabledState?(isDisabled: boolean): void
    {
        this.estaDeshabilitado = isDisabled;
    }
}
