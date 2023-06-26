import {ChangeDetectionStrategy, Component, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {CtrlTelemetria} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';
import {MatDialog} from '@angular/material/dialog';
import {ModMotorComponent} from '@s-dir-tecnica-operativa/motor/mod-motor/mod-motor.component';
import {MatIconModule} from '@angular/material/icon';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {ITelemetria} from '#/libs/models/src/lib/tecnica-operativa/telemetria/telemetria.interface';
import {TelemetriaQuery} from '@s-dir-tecnica-operativa/store/telemetria.query';
import {TelemetriaStore} from '@s-dir-tecnica-operativa/store/telemetria.store';

@Component({
    selector: 'app-lista-motores',
    standalone: true,
    imports: [CommonModule, MatCardModule, NgxUiLoaderModule, MatListModule, MatButtonModule, NavegacionPipe, MatIconModule],
    templateUrl: './lista-motores.component.html',
    styleUrls: ['./lista-motores.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMotoresComponent
{
    @Output() indiceMotor = new EventEmitter<number>();
    ngxLoader = 'ngxLoader';
    agregarMotor: CtrlTelemetria.ctrlAgregarMotor;


    constructor(public telemetriaQuery: TelemetriaQuery, private telemetriaStore: TelemetriaStore, private mdr: MatDialog, private ngxToast: NgxToastService)
    {
    }

    nvoMotor(): void
    {
        if (!this.telemetriaQuery.getActive().instalacion)
        {
            this.ngxToast.alertaToast('No haz seleccionado una instalacion', 'Selecciona instalacion');
            return;
        }
        this.mdr.open(ModMotorComponent, {width: '40%', data: false, hasBackdrop: false});
    }

    motorSelect(inst: ITelemetria, i: number): void
    {
        this.indiceMotor.emit(i);
        // this.entityTelemetria.seleccionarInst(inst._id);
        this.telemetriaStore.setActive(inst._id);
    }

    trackByFn(index: number): number
    {
        return index;
    }
}
