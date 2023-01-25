import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
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
import {RegistroSesionComponent} from '@s-admin/empleado-admin/components/registro-sesion/registro-sesion.component';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';

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
            DefaultValuePipeModule
        ],
    selector: 'app-empleado-sesion',
    templateUrl: './empleado-sesion.component.html',
    styleUrls: ['./empleado-sesion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoSesionComponent
{
    @Select(EntityEmpleadoStore.empleado) empleado$: Observable<IResolveEmpleado>;

    constructor(private dRef: MatDialog, public empleadoService: EmpleadoService)
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
}
