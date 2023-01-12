import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseAlertModule} from '@s-fuse/alert';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {DrawerService} from '@s-shared/plantillas/drawer/drawer.service';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {SinDatosComponent} from '@s-shared/sin-datos/sin-datos.component';
import {tap} from 'rxjs';

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
    listaEmpleados = 'listaEmpleados';
    empleadosFiltrados: IResolveEmpleado[] = [];
    empleados: IResolveEmpleado[];

    constructor(public entityEmpleado: EntityEmpleadoStore, private empleadoService: EmpleadoService, private ngxLoader: NgxUiLoaderService, private panelService: DrawerService)
    {
    }

    ngOnInit(): void
    {
        this.ngxLoader.startLoader(this.listaEmpleados);
        this.empleadoService.empleados().pipe(tap(res => console.log(res.data))).subscribe(() => this.ngxLoader.stopLoader(this.listaEmpleados));
    }

    seleccionarEmpleado(empleado: IResolveEmpleado): void
    {
        this.entityEmpleado.patchState({empleado});
        this.panelService.setPanelDer = true;
    }

    trackByFn(index: number, item: IResolveEmpleado): any
    {
        return item._id || index;
    }

    filtrarEmpleados(consulta: string): void
    {
        if (!consulta)
        {
            this.empleadosFiltrados = this.empleados;
            return;
        }
        this.empleadosFiltrados = this.empleados.filter(empleado => empleado.nombreCompleto.toLowerCase().includes(consulta.toLowerCase()));
    }
}
