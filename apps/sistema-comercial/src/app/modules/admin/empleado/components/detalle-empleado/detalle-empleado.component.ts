import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import {IEmpleado, IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {CambioIconoRolPipe} from '@s-admin/pipes/cambio-icono-rol.pipe';
import {RegistroSesionComponent} from '@s-admin/components/registro-sesion/registro-sesion.component';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {Select} from '@ngxs/store';
import {ListaDetalleService} from '@s-shared/plantillas/lista-detalle/lista-detalle.service';

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
    styleUrls: ['./detalle-empleado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalleEmpleadoComponent
{
    @Select(EntityEmpleadoStore.empleado) empleado$: Observable<IResolveEmpleado>;

    constructor(private dRef: MatDialog, private entityEmpleadoStore: EntityEmpleadoStore, public panelService: ListaDetalleService)
    {

    }

    asignarSesion(): void
    {
        this.dRef.open(RegistroSesionComponent, {width: '40%', data: null});
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
}
