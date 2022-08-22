import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {Auth} from '@s-app/empleado/models/auth';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {rol} from '#/libs/models/src';

@Component({
    selector: 'app-registro-sesion',
    templateUrl: './registro-sesion.component.html',
    styleUrls: ['./registro-sesion.component.scss'],
})
export class RegistroSesionComponent implements OnInit
{
    cargandoDatos = false;
    formAuth: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) private data: string, private fb: RxFormBuilder, private dialogRef: MatDialog)
    {
    }

    ngOnInit(): void
    {
        this.formAuth = this.fb.formGroup(new Auth());
    }

    registrar(): void
    {
        // const auth = {rol, ...this.formAuth.value};
        // console.log('auth', auth);
    }

    cancelar(): void
    {
        this.dialogRef.closeAll();
    }
}
