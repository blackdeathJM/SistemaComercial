import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {MatInputModule} from '@angular/material/input';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {Subscription} from 'rxjs';
import {GeneralService} from '@s-services/general.service';

@Component({
    selector: 'app-seleccionar-empleado',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule],
    templateUrl: './seleccionar-empleado.component.html',
    styleUrls: ['./seleccionar-empleado.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SeleccionarEmpleadoComponent),
            multi: true
        },
        // {
        //     provide: NG_VALIDATORS,
        //     useExisting: forwardRef(() => SeleccionarEmpleadoComponent),
        //     multi: true
        // }
    ]
})
export class SeleccionarEmpleadoComponent implements ControlValueAccessor, OnInit, OnDestroy
{
    @Input() multiple: boolean = false;
    valor: any;
    cambio: (v: any) => void;
    tocado: () => void;
    estaDeshabilitado: boolean;
    empleados: IResolveEmpleado[];
    sub = new Subscription();

    constructor(public entityEmpleado: EntityEmpleadoStore)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.entityEmpleado.entitiesArray$.subscribe((res) =>
        {
            if (res)
            {
                this.empleados = res;
            }
        }));
    }

    writeValue(valor: any): void
    {
        console.log('valor', valor);
        this.valor = valor;
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

    filtrarEmpleado(e: string): void
    {
        this.empleados = GeneralService.filtradoEmpleados(e, [...this.entityEmpleado.selectAll()]);
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
