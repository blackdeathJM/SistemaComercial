import {AfterContentInit, Component, EventEmitter, forwardRef, Input, OnDestroy, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {MatInputModule} from '@angular/material/input';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {Subscription} from 'rxjs';
import {GeneralService} from '@s-services/general.service';

@Component({
    selector: 'app-seleccionar-empleado',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatInputModule],
    templateUrl: './seleccionar-empleado.component.html',
    styleUrls: ['./seleccionar-empleado.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SeleccionarEmpleadoComponent),
            multi: true
        }
    ]
})
export class SeleccionarEmpleadoComponent implements ControlValueAccessor, OnDestroy, AfterContentInit
{
    @Input() multiple: boolean = false;
    @Input() mostrarEtiqueta = true;
    @Output() empleadoSele = new EventEmitter<string | string[]>();

    estaDeshabilitado: boolean;
    empleados: IResolveEmpleado[];
    onChangeCb?: (empleado: IResolveEmpleado) => void;
    onTouchedCb?: () => void;
    sub = new Subscription();

    constructor(public entityEmpleado: EntityEmpleadoStore)
    {
    }

    ngAfterContentInit(): void
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
        this.empleados = valor;
    }

    registerOnChange(fn: any): void
    {

        this.onChangeCb = fn;
    }

    registerOnTouched(fn: any): void
    {
        this.onTouchedCb = fn;
    }

    setDisabledState?(isDisabled: boolean): void
    {
        this.estaDeshabilitado = isDisabled;
    }

    filtrarEmpleado(e: string): void
    {
        this.empleados = GeneralService.filtradoEmpleados(e, [...this.entityEmpleado.selectAll()]);
    }

    cambioSeleccion(e: MatSelectChange): void
    {
        this.onChangeCb(e.value);
        this.empleadoSele.emit(e.value);
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
