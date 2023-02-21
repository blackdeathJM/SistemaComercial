import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {IMotor} from '#/libs/models/src/lib/tecnica-operativa/telemetria/motor/motor.interface';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {CtrlTelemetria} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';
import {MatDialog} from '@angular/material/dialog';
import {ModMotorComponent} from '@s-dir-tecnica-operativa/motor/mod-motor/mod-motor.component';
import {MatIconModule} from '@angular/material/icon';
import {isNil} from "@angular-ru/cdk/utils";
import {NgxToastService} from "@s-services/ngx-toast.service";

@Component({
    selector: 'app-lista-motores',
    standalone: true,
    imports: [CommonModule, MatCardModule, NgxUiLoaderModule, MatListModule, MatButtonModule, NavegacionPipe, MatIconModule],
    templateUrl: './lista-motores.component.html',
    styleUrls: ['./lista-motores.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMotoresComponent implements OnInit
{
    ngxLoader = 'ngxLoader';
    agregarMotor: CtrlTelemetria.ctrlAgregarMotor;

    constructor(public entityTelemetria: EntityTelemetria, private mdr: MatDialog, private ngxToast: NgxToastService)
    {
    }

    ngOnInit(): void
    {

    }

    seleccionar(motor: IMotor): void
    {

    }

    nvoMotor(): void
    {
        if (isNil(this.entityTelemetria.snapshot.instalacion))
        {
            this.ngxToast.alertaToast('No haz seleccionado una instalacion', 'Selecciona instalacion');
            return;
        }
        this.mdr.open(ModMotorComponent, {width: '40%', data: false, hasBackdrop: false});
    }
}
