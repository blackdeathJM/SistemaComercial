import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {EmpleadoService, ngxLoaderEmp} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {debounceTime, Subscription, switchMap} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
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
import {EmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/empleado.store';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';

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
            FormsModule,
        ],
    selector: 'app-empleado-admin',
    templateUrl: './empleado-admin.component.html',
    styleUrls: ['./empleado-admin.component.scss']
})
export class EmpleadoAdminComponent implements OnInit, OnDestroy
{
    ctrlBuscar: FormControl = new FormControl();
    ngxLoader = ngxLoaderEmp();
    sub = new Subscription();
    abriPanel = false;
    deshabilitar = false;
    empleadoSeleccionado: IResolveEmpleado;

    constructor(public empleadoService: EmpleadoService, private empleadoStore: EmpleadoStore, public empleadoQuery: EmpleadoQuery, private mdr: MatDialog, private router: Router,
                private activatedRoute: ActivatedRoute, private rolesService: RolesService)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.ctrlBuscar.valueChanges.pipe(debounceTime(1000), switchMap((res: string) =>
            this.empleadoService.filtrarEmpleados(res))).subscribe());
        this.empleadoService.empleados().subscribe();
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
        // this.empleadoEntity.seleccionarEmpleado(empleado);
        this.empleadoStore.setActive(empleado._id);
        this.mdr.open(RegistroSesionComponent, {width: '40%'});
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

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
        this.abriPanel = false;
    }
}
