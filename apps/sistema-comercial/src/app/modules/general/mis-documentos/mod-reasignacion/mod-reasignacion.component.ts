import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {EmpleadosSesionGQL, ReasignarUsuarioGQL} from '#/libs/datos/src';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {tap} from 'rxjs';
import {unionBy} from 'lodash-es';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {STATE_EMPLEADOS} from '@s-admin/empleado.state';
import {STATE_DOCS} from '@s-general/general.state';

@Component({
    selector: 'app-mod-reasignacion',
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            RegistrosComponent,
            MatFormFieldModule,
            MatDatepickerModule,
            MatInputModule,
            MatSelectModule,
            ReactiveFormsModule
        ],
    providers: [MatDatepickerModule],
    templateUrl: './mod-reasignacion.component.html',
    styleUrls: ['./mod-reasignacion.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModReasignacionComponent implements OnInit
{
    empleados: IResolveEmpleado[];
    selecEmpleado: FormControl = new FormControl([], RxwebValidators.required({message: 'Es necesario que selecciones por lo menos un usuario'}));
    cargando: boolean = false;

    constructor(private empleadosSesionGQL: EmpleadosSesionGQL, @Inject(MAT_DIALOG_DATA) private data: IResolveDocumento, private dRef: MatDialogRef<ModReasignacionComponent>,
                private reasignacionUsuarioGQL: ReasignarUsuarioGQL, private ngxToastService: NgxToastService)
    {
    }

    ngOnInit(): void
    {
        this.empleadosSesionGQL.watch().valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                this.selecEmpleado.setValue(this.data.usuarios);
                this.empleados = STATE_EMPLEADOS(res.data.empleadosSesion as IResolveEmpleado[]);
            }
        })).subscribe();
    }

    cambiarUsuarios(): void
    {
        if (this.selecEmpleado.value.length === 0)
        {
            this.ngxToastService.alertaToast('Debes tener seleccionado por lo menos un usuario', 'Seleccion de usuarios');
            return;
        }
        this.cargando = true;
        this.reasignacionUsuarioGQL.mutate({usuarios: {_id: this.data._id, usuarios: this.selecEmpleado.value}}).pipe(tap((res) =>
        {
            this.cargando = res.loading;
            if (res.data)
            {
                unionBy(STATE_DOCS(), res.data.reasignarUsuario as IResolveDocumento);
                this.dRef.close(res.data.reasignarUsuario);
            }
        })).subscribe();
    }

    cerrar(): void
    {
        this.dRef.close(null);
    }
}
