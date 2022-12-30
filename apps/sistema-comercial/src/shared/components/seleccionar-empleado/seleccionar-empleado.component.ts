import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {EmpleadosSesionGQL} from '#/libs/datos/src';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Observable, Subscription, tap} from 'rxjs';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Select} from "@ngxs/store";
import {EmpleadosStore} from "@s-dirAdmonFinanzas/empleados/empleados.store";

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
export class SeleccionarEmpleadoComponent implements OnInit, ControlValueAccessor
{
    @Select(EmpleadosStore.empleados) empleados$: Observable<IResolveEmpleado[]>;
    @Input() multiple: boolean = false;
    sub: Subscription = new Subscription();
    valor: any;
    cambio: (v: any) => void;
    tocado: () => void;
    estaDeshabilitado: boolean;

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL)
    {
    }

    ngOnInit(): void
    {

    }

    writeValue(obj: any): void
    {
        console.log('valor', obj, typeof obj);
        this.valor = obj;
    }

    registerOnChange(fn: any): void
    {
        console.log('cambio', fn);
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
