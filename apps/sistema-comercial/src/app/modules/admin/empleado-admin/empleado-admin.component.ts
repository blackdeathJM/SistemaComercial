import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {DrawerComponent} from '@s-shared/plantillas/drawer/drawer.component';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ListaEmpleadosComponent} from '@s-shared/components/lista-empleados/lista-empleados.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ConsultaEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/consulta-empleado/consulta-empleado.component';
import {EmpleadoService, ngxLoaderEmp} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {debounceTime, Subscription, switchMap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {EmpleadoSesionComponent} from '@s-admin/empleado-admin/components/empleado-sesion/empleado-sesion.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatFormFieldModule,
            MatIconModule,
            DrawerComponent,
            MatInputModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            ListaEmpleadosComponent,
            MatSidenavModule,
            ConsultaEmpleadoComponent,
            MatInputModule,
            MatInputModule,
            MatInputModule,
            EmpleadoSesionComponent,
            MatTableModule,
            MatPaginatorModule,
        ],
    selector: 'app-empleado-admin',
    templateUrl: './empleado-admin.component.html',
    styleUrls: ['./empleado-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoAdminComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ctrlBuscar: FormControl = new FormControl();
    ngxLoader = ngxLoaderEmp;
    columnasMostrar: string[] = ['avatar', 'nombreCompleto', 'nombre', 'puesto', 'usuario', 'acciones'];
    dataSource = new MatTableDataSource<IResolveEmpleado>([]);
    private sub = new Subscription();

    constructor(public empleadoService: EmpleadoService, private entityEmpleado: EntityEmpleadoStore)
    {
    }

    ngOnInit(): void
    {
        //TODO: buscar como implemetar los observables con buenas practicas
        this.sub.add(this.ctrlBuscar.valueChanges.pipe(debounceTime(3000), switchMap((res: string) =>
            this.empleadoService.filtrarEmpleadosConSesion(res, this.ngxLoader))).subscribe());

        this.sub.add(this.empleadoService.empleados(this.ngxLoader).subscribe());

        this.sub.add(this.entityEmpleado.entitiesArray$.subscribe(res => this.dataSource.data = res));
    }

    ngAfterViewInit(): void
    {
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }

    seleccionar(empleado: IResolveEmpleado): void
    {
        this.entityEmpleado.patchState({empleado});
        this.empleadoService.setPanel = true;
    }
}
