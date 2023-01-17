import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseAlertModule} from '@s-fuse/alert';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {EmpleadoService, loaderEmpleados} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {SinDatosComponent} from '@s-shared/sin-datos/sin-datos.component';

@Component({
    standalone: true,
    imports: [CommonModule, FuseAlertModule, NgxUiLoaderModule, MatIconModule, MatInputModule, SinDatosComponent],
    selector: 'app-lista-Empleados',
    templateUrl: './lista-empleados.component.html',
    styleUrls: ['./lista-empleados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaEmpleadosComponent implements OnInit
{
    @Output() seleccionar = new EventEmitter<IResolveEmpleado>(false);
    empleados: IResolveEmpleado[];
    loaderEmp = loaderEmpleados;

    constructor(public entityEmpleado: EntityEmpleadoStore, private empleadoService: EmpleadoService, private ngxLoader: NgxUiLoaderService)
    {
    }

    ngOnInit(): void
    {
        this.empleadoService.empleados().subscribe();
    }

    seleccionarEmpleado(empleado: IResolveEmpleado): void
    {
        this.seleccionar.emit(empleado);
    }

    trackByFn(index: number, item: IResolveEmpleado): any
    {
        return item._id || index;
    }
}
