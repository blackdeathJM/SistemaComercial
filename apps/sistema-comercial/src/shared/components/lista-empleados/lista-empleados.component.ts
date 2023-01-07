import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseAlertModule} from '@s-fuse/alert';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {STATE_ABRIR_CERRAR_PANEL} from '@s-general/variables-docs.state';

@Component({
    standalone: true,
    imports: [CommonModule, FuseAlertModule, NgxUiLoaderModule],
    selector: 'app-lista-Empleados',
    templateUrl: './lista-empleados.component.html',
    styleUrls: ['./lista-empleados.component.scss']
})
export class ListaEmpleadosComponent implements OnInit
{
    listaEmpleados = 'listaEmpleados';

    constructor(public entityEmpleado: EntityEmpleadoStore, private empleadoService: EmpleadoService, private ngxLoader: NgxUiLoaderService)
    {
    }

    ngOnInit(): void
    {
        this.ngxLoader.startLoader(this.listaEmpleados);
        this.empleadoService.empleados().subscribe(() => this.ngxLoader.stopLoader(this.listaEmpleados));
    }

    trackByFn(index: number, item: IResolveEmpleado): any
    {
        return item._id || index;
    }

    seleccionarEmpleado(empleado: IResolveEmpleado): void
    {
        this.entityEmpleado.seleccionarEmpleado(empleado);
        STATE_ABRIR_CERRAR_PANEL(true);
    }
}
