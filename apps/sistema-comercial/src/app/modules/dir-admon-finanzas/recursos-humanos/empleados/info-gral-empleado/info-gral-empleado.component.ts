import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '@s-fuse/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {fuseAnimations} from '@s-fuse/public-api';
import {MatDialog} from '@angular/material/dialog';
import {ModRegistroEmpleadoComponent} from '@s-dirAdmonFinanzas/empleados/mod-registro-empleado/mod-registro-empleado.component';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {Select} from '@ngxs/store';
import {EntityEmpleadoStore} from '@s-dirAdmonFinanzas/empleados/store/entity-empleado.store';
import {Observable} from 'rxjs';
import {IResolveEmpleado} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {CtrlRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';

@Component({
    selector: 'app-info-gral-empleado',
    standalone: true,
    imports:
        [
            CommonModule,
            MatCardModule,
            MatButtonModule,
            FuseCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            ImgDefectoPipe,
            DefaultValuePipeModule,
            ConvertirTimestamUnixPipe,
            NavegacionPipe
        ],
    templateUrl: './info-gral-empleado.component.html',
    styleUrls: ['./info-gral-empleado.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoGralEmpleadoComponent
{
    idCtrl = CtrlRecursosHumanos.agregarNvoEmpleado;
    @Select(EntityEmpleadoStore.empleado) empleado$: Observable<IResolveEmpleado>;

    constructor(private mdr: MatDialog, public stateAuth: StateAuth, private entityEmpleado: EntityEmpleadoStore)
    {
    }

    nvoEmpleado(): void
    {
        this.entityEmpleado.patchState({empleado: null});
        this.mdr.open(ModRegistroEmpleadoComponent, {data: null, width: '45%'});
    }
}
