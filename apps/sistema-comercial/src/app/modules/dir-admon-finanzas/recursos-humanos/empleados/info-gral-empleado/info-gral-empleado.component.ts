import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FuseCardModule} from '@s-fuse/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {fuseAnimations} from '@s-fuse/public-api';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {CtrlRecursosHumanos} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-admon-finanzas/recursos-humanos';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {EmpleadoQuery} from '@s-dirAdmonFinanzas/empleados/store/empleado.query';
import {IResolveEmpleado} from "#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/empleado/empleado.interface";
import {EmpleadoStore} from "@s-dirAdmonFinanzas/empleados/store/empleado.store";
import {MatDialog} from "@angular/material/dialog";
import {ModRegistroEmpleadoComponent} from "@s-dirAdmonFinanzas/empleados/mod-registro-empleado/mod-registro-empleado.component";

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
            NavegacionPipe,
            NgOptimizedImage
        ],
    templateUrl: './info-gral-empleado.component.html',
    styleUrls: ['./info-gral-empleado.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoGralEmpleadoComponent
{
    // @Select(EmpleadoEntity.empleado) empleado$: Observable<IResolveEmpleado>;
    idCtrl = CtrlRecursosHumanos.agregarNvoEmpleado;

    constructor(public empleadoQuery: EmpleadoQuery, private empleadoStore: EmpleadoStore, private mdr: MatDialog)
    {
    }

    editarInfo(empleado: IResolveEmpleado): void
    {
        this.mdr.open(ModRegistroEmpleadoComponent, {width: '45%', data: empleado});
    }

    checarActivo(): void
    {
        console.log(this.empleadoQuery.getActive())
    }
}
