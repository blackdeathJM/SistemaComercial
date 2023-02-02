import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {EmpleadoService, ngxLoaderEmp} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {debounceTime, Subscription, switchMap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {MatDialog} from '@angular/material/dialog';
import {RegistroSesionComponent} from '@s-admin/empleado-admin/registro-sesion/registro-sesion.component';
import {MatButtonModule} from '@angular/material/button';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FuseCardModule} from '@s-fuse/card';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RolesService} from '@s-core/auth/store/roles.service';
import {TCrearRol} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {defaultNavigation} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/data';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            ImgDefectoPipe,
            DefaultValuePipeModule,
            NgxUiLoaderModule,
            MatCheckboxModule,
            FuseCardModule,
            MatListModule,
            MatSidenavModule,
            RouterOutlet,
            RouterLink,
            MatTooltipModule,
        ],
    selector: 'app-empleado-admin',
    templateUrl: './empleado-admin.component.html',
    styleUrls: ['./empleado-admin.component.scss']
})
export class EmpleadoAdminComponent implements OnInit, OnDestroy
{
    ctrlBuscar: FormControl = new FormControl();
    ngxLoader = ngxLoaderEmp;
    sub = new Subscription();
    abriPanel = false;
    deshabilitar = false;
    empleadoSeleccionado: IResolveEmpleado;

    constructor(public empleadoService: EmpleadoService, public entityEmpleado: EntityEmpleadoStore, private mdr: MatDialog, private router: Router, private activatedRoute: ActivatedRoute,
                private cdr: ChangeDetectorRef, private rolesService: RolesService)
    {
    }

    ngOnInit(): void
    {
        //TODO: buscar como implemetar los observables con buenas practicas
        this.sub.add(this.ctrlBuscar.valueChanges.pipe(debounceTime(1000), switchMap((res: string) =>
            this.empleadoService.filtrarEmpleados(res, this.ngxLoader))).subscribe());
        this.empleadoService.empleados(this.ngxLoader).subscribe();
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
        this.abriPanel = false;
    }

    listaRoles(empleado: IResolveEmpleado): void
    {
        this.empleadoSeleccionado = empleado;
        this.router.navigate(['lista-roles', empleado._id], {relativeTo: this.activatedRoute}).then(() => this.abriPanel = true);

    }

    backDropClick(): void
    {
        console.log('backDropClick');
    }

    crearSesion(empleado: IResolveEmpleado): void
    {
        this.entityEmpleado.patchState({empleado});
        this.mdr.open(RegistroSesionComponent, {width: '40%'}).afterClosed().subscribe((res) =>
        {
            this.deshabilitar = res;
            this.cdr.markForCheck();
        });
    }

    sesionInicial(empleado: IResolveEmpleado): void
    {
        const args: TCrearRol =
            {
                idEmpleado: empleado._id,
                roles: defaultNavigation
            };
        this.rolesService.crearRoles(args).subscribe();
    }
}
