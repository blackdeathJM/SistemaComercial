import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistroSesionComponent} from '@s-app/empleado/components/registro-sesion/registro-sesion.component';
import {Subscription, tap} from 'rxjs';
import {STATE_EMPLEADOS} from '@s-app/empleado/empleado.state';
import {FormControl} from '@angular/forms';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import {unionBy} from 'lodash-es';
import {IEmpleado, IModificado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import moment from 'moment';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {ActualizarRolGQL} from '#/libs/datos/src';
import {NgxToastService} from '#/libs/services/src/lib/services/ngx-toast.service';
import {IRoles} from "#/libs/models/src/lib/admin/empleado/auth/auth.interface";

@Component({
    selector: 'app-detalle-empleado',
    templateUrl: './detalle-empleado.component.html',
    styleUrls: ['./detalle-empleado.component.scss']
})
export class DetalleEmpleadoComponent implements OnDestroy
{
    @Output() cerrarPanel = new EventEmitter<boolean>();
    _empleado: IEmpleado;
    subscripcion: Subscription = new Subscription();
    roles = ['ninguno', 'lectura', 'completo'];

    controlRoles: FormControl = new FormControl();


    constructor(private dialogRef: MatDialog, private actualizarRolGQL: ActualizarRolGQL, private ngxToast: NgxToastService)
    {
    }


    @Input() set empleado(valor: IEmpleado)
    {
        this._empleado = valor;
    }

    cerrarP(): void
    {
        this.cerrarPanel.emit(false);
    }

    asignarSesion(data: IEmpleado): void
    {
        this.subscripcion.add(this.dialogRef.open(RegistroSesionComponent, {data, width: '40%'}).afterClosed().subscribe(() =>
        {
            setTimeout(() =>
            {
                this._empleado = STATE_EMPLEADOS().filter(value => value._id === data._id)[0];
            }, 200);
        }));
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    permisoSeleccionado(evento: void | MatButtonToggleChange, permiso: IRoles, empleado: IEmpleado): void
    {
        // TODO: Cambiar a la nueva estructura de roles
        const rol = {...permiso};
        rol.tipoAcceso = evento['value'];
        rol.oculto = evento['value'] === 'ninguno';

        delete rol['__typename'];

        const modificadoPor: IModificado =
            {
                accion: `Se cambio el rol a: ${rol.id} - ${rol.tipoAcceso}`,
                fecha: moment().format('MM-DD-YYYY HH:mm'),
                usuario: STATE_DATOS_SESION().nombreCompleto
            };
        this.actualizarRolGQL.mutate({_id: empleado._id, rol, modificadoPor}).pipe(tap((res) =>
        {
            if (res.data)
            {
                unionBy(STATE_EMPLEADOS(), res.data.actualizarRol);
                this.ngxToast.satisfactorioToast('El permiso se ha cambiado con exito', 'Cambio de rol');
            }
        })).subscribe();
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
