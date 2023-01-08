import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseAlertModule} from '@s-fuse/alert';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {ListaDetalleService} from '@s-shared/plantillas/lista-detalle/lista-detalle.service';

@Component({
    standalone: true,
    imports: [CommonModule, FuseAlertModule, NgxUiLoaderModule],
    selector: 'app-lista-Empleados',
    templateUrl: './lista-empleados.component.html',
    styleUrls: ['./lista-empleados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaEmpleadosComponent implements OnInit
{
    listaEmpleados = 'listaEmpleados';

    constructor(public entityEmpleado: EntityEmpleadoStore, private empleadoService: EmpleadoService, private ngxLoader: NgxUiLoaderService, private panelService: ListaDetalleService)
    {
    }

    ngOnInit(): void
    {
        this.ngxLoader.startLoader(this.listaEmpleados);
        this.empleadoService.empleados().subscribe(() => this.ngxLoader.stopLoader(this.listaEmpleados));
    }

    seleccionarEmpleado(empleado: IResolveEmpleado): void
    {
        this.entityEmpleado.seleccionarEmpleado(empleado);
        this.panelService.setPanel = true;
    }

    trackByFn(index: number, item: IResolveEmpleado): any
    {
        return item._id || index;
    }
}
