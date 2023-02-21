import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NavegacionPipe} from '#/apps/sistema-comercial/src/app/pipes/navegacion.pipe';
import {CtrlTelemetria} from '#/apps/sistema-comercial/src/app/mock-api/common/navigation/dir-tecnica-operativa/telemetria';
import {MatDialog} from '@angular/material/dialog';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {ModInstalacionComponent} from '@s-dir-tecnica-operativa/instalaciones/mod-instalacion/mod-instalacion.component';
import {fuseAnimations} from '@s-fuse/public-api';
import {ListaMedicionesDinamicaEstaticaComponent} from '@s-dir-tecnica-operativa/instalaciones/lista-mediciones-dinamica-estatica/lista-mediciones-dinamica-estatica.component';
import {TelemetriaService} from '@s-dir-tecnica-operativa/store/telemetria.service';
import {ITomarMedicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/instalacion/instalacion.interface';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {IMedicion} from '#/libs/models/src/lib/tecnica-operativa/telemetria/comun.interface';
import {FuseAlertModule} from '@s-fuse/alert';
import {ModNivelDinEstComponent} from '@s-dir-tecnica-operativa/instalaciones/mod-nivel-din-est/mod-nivel-din-est.component';
import {isNotNil} from '@angular-ru/cdk/utils';

export interface IMedicionDinamicoEstatico
{
    indice: number;
    _id: string;
    tipoMedicion: 'instalacion.nivelDinamico' | 'instalacion.nivelEstatico';
}

@Component({
    selector: 'app-detalle-instalacion',
    standalone: true,
    imports: [CommonModule, MatDividerModule, MatCardModule, MatButtonModule, MatIconModule, NavegacionPipe, ListaMedicionesDinamicaEstaticaComponent, FuseAlertModule],
    templateUrl: './detalle-instalacion.component.html',
    styleUrls: ['./detalle-instalacion.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleInstalacionComponent implements OnInit, OnDestroy
{
    ctrlEditarInstalacion = CtrlTelemetria.ctrlEditarInstalacion;
    ctrlNvaMedicionDin = CtrlTelemetria.ctrlNvaMedicionDin;
    ctrlNvaMedicionEst = CtrlTelemetria.ctrlNvaMedicionEst;
    dataSourceDinamico = new MatTableDataSource<IMedicion>([]);
    dataSourceEstatico = new MatTableDataSource<IMedicion>([]);
    _id: string;
    sub = new Subscription();

    constructor(private mdf: MatDialog, public entityTelemetria: EntityTelemetria, private telemetriaService: TelemetriaService)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.entityTelemetria.state$.subscribe((res) =>
        {
            if (isNotNil(res.instalacion))
            {
                this._id = res.instalacion._id;
                this.dataSourceDinamico.data = res.instalacion.instalacion.nivelDinamico;
                this.dataSourceEstatico.data = res.instalacion.instalacion.nivelEstatico;
            }
        }));
    }

    editarInfo(): void
    {
        this.mdf.open(ModInstalacionComponent, {width: '40%', hasBackdrop: true, disableClose: true, data: true});
    }

    agregarNvaMedicion(_id: string, tipoNivel: 'instalacion.nivelDinamico' | 'instalacion.nivelEstatico'): void
    {
        const args: ITomarMedicion =
            {
                _id,
                tipoNivel
            };
        this.telemetriaService.crearRegLectura(args).subscribe();
    }

    filaSelec(e: [IMedicion, number], tipoMedicion: 'instalacion.nivelDinamico' | 'instalacion.nivelEstatico'): void
    {
        const data: IMedicionDinamicoEstatico =
            {
                _id: this._id,
                tipoMedicion,
                indice: e[1],
            };

        this.mdf.open(ModNivelDinEstComponent, {width: '60%', data});
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
