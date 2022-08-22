import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {Auth} from '@s-app/empleado/models/auth';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {IRol} from '#/libs/models/src';
import {AsignarAuthGQL} from '#/libs/datos/src';
import {finalize, tap} from 'rxjs';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {unionBy} from 'lodash-es';
import {NgxToastService} from '#/libs/services/src';

@Component({
    selector: 'app-registro-sesion',
    templateUrl: './registro-sesion.component.html',
    styleUrls: ['./registro-sesion.component.scss'],
})
export class RegistroSesionComponent implements OnInit
{
    cargandoDatos = false;
    formAuth: FormGroup;
    #rol: IRol[] =
        [
            {
                id: 'administrador',
                tipoAcceso: 'N',
                oculto: true
            },
            {
                id: 'telemetria',
                tipoAcceso: 'N',
                oculto: true
            }
        ];

    constructor(@Inject(MAT_DIALOG_DATA) private data: string, private fb: RxFormBuilder, private dialogRef: MatDialog, private asignarAuthGQL: AsignarAuthGQL,
                private ngxToastService: NgxToastService)
    {
    }

    ngOnInit(): void
    {
        this.formAuth = this.fb.formGroup(new Auth());
    }

    registrar(): void
    {
        this.cargandoDatos = true;
        const {confirmContrasena, ...resto} = this.formAuth.value;
        const auth = {rol: this.#rol, ...resto};
        this.asignarAuthGQL.mutate({_id: this.data, auth}, {fetchPolicy: 'network-only'}).pipe(finalize(() => this.cancelar()), tap((res) =>
        {
            if (res.data)
            {
                unionBy(STATE_EMPLEADOS(), res.data.asignarAuth);
                this.ngxToastService.satisfactorioToast('La asignacion de sesion fue realizada correctamente', 'Asignacion de sesion');
            }
            this.cargandoDatos = false;
        })).subscribe();
    }

    cancelar(): void
    {
        this.dialogRef.closeAll();
    }
}
