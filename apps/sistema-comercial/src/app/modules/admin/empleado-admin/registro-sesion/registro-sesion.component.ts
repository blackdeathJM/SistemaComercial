import {Component, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ActualizarContrasenaAdminGQL, RegistroSesionGQL} from '#/libs/datos/src';
import {concatMap, finalize} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {CommonModule} from '@angular/common';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {TrimDirective} from '@s-directives/trim.directive';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {GeneralService} from '@s-services/general.service';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {isNotNil} from '@angular-ru/cdk/utils';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {Auth} from '@s-admin/empleado-admin/models/auth';
import {AuthService} from '@s-core/auth/store/auth.service';
import {TCrearRol} from '#/libs/models/src/lib/admin/empleado/auth/roles.interface';
import {defaultNavigation} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/data';
import {RolesService} from '@s-core/auth/store/roles.service';

@Component({
    standalone: true,
    imports:
        [
            CommonModule, MatDialogModule, ReactiveFormsModule, RxReactiveFormsModule, MatFormFieldModule, MatInputModule, RegistrosComponent, TrimDirective, NgxTrimDirectiveModule
        ],
    selector: 'app-registro-sesion',
    templateUrl: './registro-sesion.component.html',
    styleUrls: ['./registro-sesion.component.scss'],
})
export class RegistroSesionComponent implements OnInit
{
    cargandoDatos = false;
    formAuth: FormGroup;
    soloLectura = false;

    constructor(private fb: RxFormBuilder, public mdr: MatDialogRef<RegistroSesionComponent>, private registroSesionGQL: RegistroSesionGQL, private ngxToastService: NgxToastService,
                private actualizarPassGQL: ActualizarContrasenaAdminGQL, private stateAuth: StateAuth, private entityEmpleado: EntityEmpleadoStore, private authService: AuthService,
                private rolesService: RolesService)
    {
    }

    ngOnInit(): void
    {
        this.formAuth = this.fb.formGroup(new Auth());
        if (isNotNil(this.entityEmpleado.snapshot.empleado.auth))
        {
            this.soloLectura = true;
            this.formAuth.patchValue(this.entityEmpleado.snapshot.empleado.auth);
        }
    }

    registrar(): void
    {
        this.cargandoDatos = true;
        this.formAuth.disable();
        const {confirmContrasena, ...resto} = this.formAuth.value;
        // si el campo auth ya existe le damos opcion al administrador solo de cambiar la contrasena y si no existe puede agregar el usuario y contrasena
        if (isNotNil(this.entityEmpleado.snapshot.empleado.auth))
        {
            const datos =
                {
                    _id: this.entityEmpleado.snapshot.empleado._id,
                    contrasena: this.formAuth.get('contrasena').value,
                };
            const modificadoPor: IModificado =
                {
                    usuario: this.stateAuth.snapshot.auth.usuario,
                    accion: 'Modificacion de contrasena',
                    fecha: GeneralService.fechaHoraActual(),
                    valorActual: [{}],
                    valorAnterior: [{}]
                };

            this.authService.actualizarContrasena(datos, modificadoPor).pipe(finalize(() =>
            {
                this.cargandoDatos = false;
                this.mdr.close();
            })).subscribe();

        } else
        {
            const modificadoPor: IModificado =
                {
                    usuario: this.stateAuth.snapshot.nombreCompleto,
                    fecha: GeneralService.fechaHoraActual(),
                    accion: 'Asignacion de usuario para el inicio de sesion en el portal',
                    valorAnterior: [{}],
                    valorActual: [{}]
                };
            this.authService.registroSesion(this.entityEmpleado.snapshot.empleado._id, resto, modificadoPor).pipe(concatMap((res) =>
            {
                if (isNotNil(res.data.registroSesion))
                {
                    const args: TCrearRol =
                        {
                            idEmpleado: res.data.registroSesion._id,
                            roles: defaultNavigation
                        };
                    return this.rolesService.crearRoles(args).pipe(finalize(() =>
                    {
                        this.cargandoDatos = false;
                        this.mdr.close();
                    }));
                }
            })).subscribe();
        }
    }
}
