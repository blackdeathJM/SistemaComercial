import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import {IEmpleado, IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {FuseNavigationItem} from '@s-fuse/navigation';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {CambioIconoRolPipe} from '@s-admin/pipes/cambio-icono-rol.pipe';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {RegistroSesionComponent} from '@s-admin/components/registro-sesion/registro-sesion.component';
import {STATE_EMPLEADOS} from '@s-admin/empleado.state';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            MatTooltipModule,
            NgxJsonViewerModule,
            CambioIconoRolPipe,
            MatButtonToggleModule,
            ReactiveFormsModule,
            MatSlideToggleModule,
            MatListModule
        ],
    exportAs: 'app-detalle-empleado',
    selector: 'app-detalle-empleado',
    templateUrl: './detalle-empleado.component.html',
    styleUrls: ['./detalle-empleado.component.scss']
})
export class DetalleEmpleadoComponent implements OnDestroy
{
    @Output() cerrarPanel = new EventEmitter<boolean>();
    _empleado: IResolveEmpleado;
    subscripcion: Subscription = new Subscription();
    role: FuseNavigationItem[];

    controlRoles: FormControl = new FormControl();


    constructor(private dialogRef: MatDialog, private ngxToast: NgxToastService)
    {

    }

    @Input() set empleado(valor: IResolveEmpleado)
    {
        this._empleado = valor;
    }

    cerrarP(): void
    {
        this.cerrarPanel.emit(false);
    }

    asignarSesion(data: IResolveEmpleado): void
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

    permisoSeleccionado(evento: void | MatButtonToggleChange, permiso: string, empleado: IEmpleado): void
    {
        // TODO: Cambiar a la nueva estructura de roles
        // const role = {...permiso};
        // role.tipoAcceso = evento['value'];
        // role.oculto = evento['value'] === 'ninguno';
        //
        // delete role['__typename'];
        //
        // const modificadoPor: IModificado =
        //     {
        //         accion: `Se cambio el rol a: ${role.id} - ${role.tipoAcceso}`,
        //         fecha: GeneralService.fechaHoraActual(),
        //         usuario: STATE_DATOS_SESION().nombreCompleto
        //     };
        // this.actualizarRolGQL.mutate({_id: empleado._id, role, modificadoPor}).pipe(tap((res) =>
        // {
        //     if (res.data)
        //     {
        //         unionBy(STATE_EMPLEADOS(), res.data.actualizarRol);
        //         this.ngxToast.satisfactorioToast('El permiso se ha cambiado con exito', 'Cambio de rol');
        //     }
        // })).subscribe();
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
