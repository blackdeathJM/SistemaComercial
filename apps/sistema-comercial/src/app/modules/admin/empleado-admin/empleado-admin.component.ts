import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {EmpleadoService, ngxLoaderEmp} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {debounceTime, Subscription, switchMap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {RegistroSesionComponent} from '@s-admin/empleado-admin/components/registro-sesion/registro-sesion.component';
import {AsigTodosRolesGQL} from '#/libs/datos/src';
import {defaultNavigation} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/data';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FuseCardModule} from "@s-fuse/card";
import {MatListModule} from "@angular/material/list";

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatInputModule,
            MatDividerModule,
            MatButtonModule,
            MatIconModule,
            MatSidenavModule,
            ImgDefectoPipe,
            DefaultValuePipeModule,
            NgxUiLoaderModule,
            MatExpansionModule,
            MatCheckboxModule,
            FuseCardModule,
            MatListModule,
        ],
    selector: 'app-empleado-admin',
    templateUrl: './empleado-admin.component.html',
    styleUrls: ['./empleado-admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoAdminComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ctrlBuscar: FormControl = new FormControl();
    ngxLoader = ngxLoaderEmp;
    sub = new Subscription();
    abriPanel = false;

    constructor(public empleadoService: EmpleadoService, public entityEmpleado: EntityEmpleadoStore, private mdr: MatDialog, private asi: AsigTodosRolesGQL)
    {
    }

    ngOnInit(): void
    {
        //TODO: buscar como implemetar los observables con buenas practicas
        this.sub.add(this.ctrlBuscar.valueChanges.pipe(debounceTime(1000), switchMap((res: string) =>
            this.empleadoService.filtrarEmpleados(res, this.ngxLoader))).subscribe());
        this.empleadoService.empleados(this.ngxLoader).subscribe();
    }

    sesion(empleado: IResolveEmpleado): void
    {
        this.entityEmpleado.patchState({empleado});
        this.mdr.open(RegistroSesionComponent, {width: '40%'});
    }

    actDes(empleado: IResolveEmpleado): void
    {

    }
    asigTodos(): void
    {
        this.asi.mutate({rol: {rol: defaultNavigation}}).subscribe();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
        this.abriPanel = false;
    }
}
