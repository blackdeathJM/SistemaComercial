import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {ActualizarContrasenaAdminGQL, AsignarAuthGQL} from '#/libs/datos/src';
import {finalize, tap} from 'rxjs';
import {IEmpleado, IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {CommonModule} from '@angular/common';
import {IModificado} from '#/libs/models/src/lib/common/common.interface';
import {TrimDirective} from '@s-directives/trim.directive';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {Auth} from '@s-admin/models/auth';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {StateAuth} from '@s-core/auth/auth.store';
import {EmpleadosStore} from '#/apps/sistema-comercial/src/query/empleados.store';
import {$cast} from '@angular-ru/cdk/utils';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            RegistrosComponent,
            TrimDirective,
            NgxTrimDirectiveModule,
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

    constructor(@Inject(MAT_DIALOG_DATA) private data: IEmpleado, private fb: RxFormBuilder, private dRef: MatDialog, private asignarAuthGQL: AsignarAuthGQL,
                private ngxToastService: NgxToastService, private actualizarContrasenaAdminGQL: ActualizarContrasenaAdminGQL, private stateAuth: StateAuth,
                private stateEmpleados: EmpleadosStore, private empleadoStore: EmpleadosStore)
    {
    }

    ngOnInit(): void
    {
        this.formAuth = this.fb.formGroup(new Auth());
        if (this.data.auth)
        {
            this.soloLectura = true;
            this.formAuth.patchValue(this.data.auth);
        }
    }

    registrar(): void
    {
        this.cargandoDatos = true;
        this.formAuth.disable();
        const {confirmContrasena, ...resto} = this.formAuth.value;
        // si el campo auth ya existe le damos opcion al administrador solo de cambiar la contrasena y si no existe puede agregar el usuario y contrasena
        if (this.data.auth)
        {
            const datos =
                {
                    _id: this.data._id,
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

            this.actualizarContrasenaAdminGQL.mutate({datos, modificadoPor}).pipe(finalize(() =>
            {
                this.cargandoDatos = false;
                this.cancelar();
            }), tap((res) =>
            {
                if (res.data)
                {
                    this.ngxToastService.satisfactorioToast('La contrasena fue reasignada con exito', 'Cambio de contrasena');
                }
            })).subscribe();
        } else
        {
            const modificadoPor: IModificado =
                {
                    usuario: this.stateAuth.snapshot.auth.usuario,
                    fecha: GeneralService.fechaHoraActual(),
                    accion: 'Asignacion de usuario para el inicio de sesion en el portal',
                    valorAnterior: [{}],
                    valorActual: [{}]
                };

            this.asignarAuthGQL.mutate({_id: this.data._id, auth: resto, modificadoPor}, {fetchPolicy: 'network-only'}).pipe(finalize(() =>
            {
                this.cancelar();
                this.cargandoDatos = false;
            }), tap((res) =>
            {
                if (res.data)
                {
                    // unionBy(STATE_EMPLEADOS(), res.data.asignarAuth);
                    const sesionAsignada: IResolveEmpleado = $cast<IResolveEmpleado>(res.data.asignarAuth);
                    this.stateEmpleados.asignarAuth(sesionAsignada);

                    this.ngxToastService.satisfactorioToast('La asignacion de sesion fue realizada correctamente', 'Asignacion de sesion');
                } else
                {
                    this.ngxToastService.errorToast('Asignacion de sesion', 'Ocurrio un error al tratar de asignar la sesion para este usuario');
                }
            })).subscribe();
        }

    }

    cancelar(): void
    {
        this.dRef.closeAll();
    }
}
