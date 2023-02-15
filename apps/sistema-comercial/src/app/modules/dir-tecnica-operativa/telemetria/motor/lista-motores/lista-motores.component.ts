import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {IMotor} from '#/libs/models/src/lib/tecnica-operativa/telemetria/motor/motor.interface';
import {EntityTelemetria} from '@s-dir-tecnica-operativa/store/telemetria.entity';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-lista-motores',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule, NgxUiLoaderModule],
    templateUrl: './lista-motores.component.html',
    styleUrls: ['./lista-motores.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaMotoresComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator, {static: true}) paginacion: MatPaginator;
    dataSource: MatTableDataSource<IMotor>;
    columnasMostrar = ['fechaInstalacion'];
    ngxLoader = 'ngxLoader';
    sub = new Subscription();

    constructor(private entityTelemetria: EntityTelemetria)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.entityTelemetria.state$.subscribe((res) =>
        {
            this.dataSource.data = res.instalacion.motores;
            this.dataSource.paginator = this.paginacion;
        }));
    }

    seleccionar(motor: IMotor): void
    {

    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
