import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {DeptoService} from '@s-dirAdmonFinanzas/departamento/store/depto.service';
import {EmpleadoService, ngxLoaderEmp} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {Subscription} from 'rxjs';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {MatIconModule} from '@angular/material/icon';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {MatButtonModule} from '@angular/material/button';
import {CtrlRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {EmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/empleado.store';
import {DeptoQuery} from '@s-dirAdmonFinanzas/departamento/store/depto.query';
import {MatDialog} from "@angular/material/dialog";
import {ModRegistroEmpleadoComponent} from "@s-dirAdmonFinanzas/empleados/mod-registro-empleado/mod-registro-empleado.component";

@Component({
    selector: 'app-lista-empleados',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatCardModule, MatInputModule, MatSelectModule, MatPaginatorModule, ImgDefectoPipe, DefaultValuePipeModule,
        MatIconModule, NgxUiLoaderModule, MatButtonModule, NavegacionPipe],
    templateUrl: './lista-empleados.component.html',
    styleUrls: ['./lista-empleados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaEmpleadosComponent implements AfterViewInit
{
    @ViewChild(MatPaginator, {static: true}) paginacion: MatPaginator;
    columnasAMostrar = ['avatar', 'nombreCompleto', 'nombre', 'puesto', 'correo', 'activo'];
    dataSource = new MatTableDataSource<IResolveEmpleado>([]);

    ngxLoader = ngxLoaderEmp();

    agregarNuevo = CtrlRecursosHumanos.agregarNvoEmpleado;
    sub = new Subscription();

    constructor(public deptoQuery: DeptoQuery, private empleadoQuery: EmpleadoQuery, private empleadoStore: EmpleadoStore, private deptoService: DeptoService,
                private empleadoService: EmpleadoService, private mdr: MatDialog)
    {
    }

    ngAfterViewInit(): void
    {
        this.sub.add(this.empleadoQuery.selectAll().subscribe((res: IResolveEmpleado[]) =>
        {
            this.dataSource.data = res;
            this.dataSource.paginator = this.paginacion;
        }));
    }

    seleccionar(empleado: IResolveEmpleado): void
    {
        console.log(empleado);
        // this.entityEmpleado.patchState({empleado});
        this.empleadoStore.setActive(empleado._id);
    }

    nvoEmpleado(): void
    {
        this.empleadoStore.setActive(null);
        this.mdr.open(ModRegistroEmpleadoComponent, {width: '45%', data: null});
    }

}
