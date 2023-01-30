import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {Select} from '@ngxs/store';
import {EmpleadoService} from '@s-dirAdmonFinanzas/empleados/store/empleado.service';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {MatCardModule} from '@angular/material/card';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            MatTooltipModule,
            ReactiveFormsModule,
            MatSlideToggleModule,
            MatListModule,
            DefaultValuePipeModule,
            MatCardModule,
            ImgDefectoPipe
        ],
    selector: 'app-empleado-sesion',
    templateUrl: './empleado-sesion.component.html',
    styleUrls: ['./empleado-sesion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoSesionComponent
{
    @Select(EntityEmpleadoStore.empleado) empleado$: Observable<IResolveEmpleado>;
    @Output() panel = new EventEmitter<boolean>();

    constructor(public empleadoService: EmpleadoService)
    {

    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    cerrarP(): void
    {
        this.panel.emit(true);
    }

    asignarSesion(_empleado: any): void
    {

    }
}
