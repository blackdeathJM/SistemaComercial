import {AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {SeleccionStore} from '@s-dir-general/selecciones/seleccion.store';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {isNil} from '@angular-ru/cdk/utils';
import {Subscription} from 'rxjs';
import {SeleccionarEmpleadoComponent} from '@s-shared/components/seleccionar-empleado/seleccionar-empleado.component';

@Component({
    selector: 'app-acciones-mir-pbr',
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatInputModule, MatSelectModule, FormsModule, SeleccionarEmpleadoComponent, ReactiveFormsModule],
    templateUrl: './acciones-mir-pbr.component.html',
    styleUrls: ['./acciones-mir-pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccionesMirPbrComponent implements AfterContentInit, OnDestroy
{
    @Output() porAno = new EventEmitter<number>();
    @Output() porCentroGestor = new EventEmitter<[string, number]>();
    @Output() porEmpleado = new EventEmitter<[string | string[], number]>();
    @Input() habEmpleado = false;
    @Input() habCentroGestor = false;

    ctrlEmpleados = new FormControl();
    buscarAno: number = new Date().getFullYear();
    bCentroGestor: string;
    empleadosFiltrar: IResolveEmpleado[];
    sub = new Subscription();

    constructor(public seleccionStore: SeleccionStore, private ngxToast: NgxToastService, public entityEmpleado: EntityEmpleadoStore)
    {
    }

    ngAfterContentInit(): void
    {
        if (this.habEmpleado)
        {
            this.sub.add(this.entityEmpleado.entitiesArray$.subscribe((res) =>
            {
                if (res)
                {
                    this.empleadosFiltrar = [...res];
                }
            }));
        }
    }

    buscarPorCentroGestor(e: string): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Es necesario colocar una fecha para poder utilizar este filtrado', 'Filtrar centro gestor');
            return;
        }
        this.porCentroGestor.emit([e, ano]);
    }

    buscarPorAno(): void
    {
        const ano = parseInt(String(this.buscarAno), 10);
        if (isNaN(ano))
        {
            this.ngxToast.alertaToast('Introduce un año a cuatro digitos', 'Valor numerico requerido');
            return;
        }
        this.porAno.emit(this.buscarAno);
    }

    buscarEmpleado(e: string | string[]): void
    {
        if (isNil(this.buscarAno))
        {
            this.ngxToast.alertaToast('Es necesario seleccionar año', 'Filtrado');
            return;
        }
        this.porEmpleado.emit([e, this.buscarAno]);
    }

    trackByFn(index: number, elemento: string): number | string
    {
        return index || elemento;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
