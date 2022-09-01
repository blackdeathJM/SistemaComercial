import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {Auth} from '@s-app/empleado/models/auth';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {ActualizarContrasenaAdminGQL, AsignarAuthGQL} from '#/libs/datos/src';
import {finalize, tap} from 'rxjs';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {unionBy} from 'lodash-es';
import {NgxToastService} from '#/libs/services/src';
import {IEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';

@Component({
    selector: 'app-registro-sesion',
    templateUrl: './registro-sesion.component.html',
    styleUrls: ['./registro-sesion.component.scss'],
})
export class RegistroSesionComponent implements OnInit
{
    cargandoDatos = false;
    formAuth: FormGroup;
    soloLectura = false;

    constructor(@Inject(MAT_DIALOG_DATA) private data: IEmpleado, private fb: RxFormBuilder, private dialogRef: MatDialog, private asignarAuthGQL: AsignarAuthGQL,
                private ngxToastService: NgxToastService, private actualizarContrasenaAdminGQL: ActualizarContrasenaAdminGQL)
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

        const {confirmContrasena, ...resto} = this.formAuth.value;
            // si el campo auth ya existe le damos opcion al administrador solo de cambiar la contrasena y si no existe puede agregar el usuario y contrasena
        if (this.data.auth)
        {
            const datos =
                {
                    _id: this.data._id,
                    contrasena: this.formAuth.get('contrasena').value
                };

            this.actualizarContrasenaAdminGQL.mutate({datos}).pipe(finalize(() =>
            {
                this.cargandoDatos = false;
                this.cancelar();
            }), tap((res) =>
            {
                if (res.data)
                {
                    unionBy(STATE_EMPLEADOS(), res.data.actualizarContrasenaAdmin);
                    this.ngxToastService.satisfactorioToast('La contrasena fue reasignada con exito', 'Cambio de contrasena');
                }
            })).subscribe();
        } else
        {
            this.asignarAuthGQL.mutate({_id: this.data._id, auth: resto}, {fetchPolicy: 'network-only'}).pipe(finalize(() => this.cancelar()), tap((res) =>
            {
                if (res.data)
                {
                    unionBy(STATE_EMPLEADOS(), res.data.asignarAuth);
                    this.ngxToastService.satisfactorioToast('La asignacion de sesion fue realizada correctamente', 'Asignacion de sesion');
                }
                this.cargandoDatos = false;
            })).subscribe();
        }

    }

    cancelar(): void
    {
        this.dialogRef.closeAll();
    }
}
