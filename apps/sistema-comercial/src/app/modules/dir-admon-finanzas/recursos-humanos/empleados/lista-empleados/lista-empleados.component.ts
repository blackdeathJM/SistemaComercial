import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {DeptoEntity} from '@s-dirAdmonFinanzas/departamento/store/depto.entity';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {DeptoService} from '@s-dirAdmonFinanzas/departamento/store/depto.service';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {forkJoin, Subscription} from 'rxjs';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {MatIconModule} from '@angular/material/icon';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {MatButtonModule} from '@angular/material/button';
import {CtrlRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {EmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/empleado.store';

@Component({
    selector: 'app-lista-empleados',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatCardModule, MatInputModule, MatSelectModule, MatPaginatorModule, ImgDefectoPipe, DefaultValuePipeModule, MatIconModule, NgxUiLoaderModule, MatButtonModule, NavegacionPipe],
    templateUrl: './lista-empleados.component.html',
    styleUrls: ['./lista-empleados.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaEmpleadosComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator, {static: true}) paginacion: MatPaginator;
    columnasAMostrar = ['avatar', 'nombreCompleto', 'nombre', 'puesto', 'correo', 'activo'];
    dataSource = new MatTableDataSource<IResolveEmpleado>([]);
    ngxLoader: 'ngxLoader';
    agregarNuevo = CtrlRecursosHumanos.agregarNvoEmpleado;
    sub = new Subscription();

    constructor(public entityDepto: DeptoEntity, private empleadoQuery: EmpleadoQuery, private empleadoStore: EmpleadoStore, private deptoService: DeptoService, private empleadoService: EmpleadoService)
    {
    }

    ngOnInit(): void
    {
        forkJoin([this.deptoService.departamentos(), this.empleadoService.empleados(this.ngxLoader)]).subscribe();
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
        // this.entityEmpleado.patchState({empleado});
        this.empleadoStore.setActive(empleado._id);
    }

    nvoEmpleado(): void
    {

    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }

}
