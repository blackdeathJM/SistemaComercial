import {Component, OnInit} from '@angular/core';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-dirAdmonFinanzas/departamento/components/mod-depto/mod-depto.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {DeptoEntity} from '@s-dirAdmonFinanzas/departamento/store/depto.entity';
import {DeptoService, loaderDeptos} from '@s-dirAdmonFinanzas/departamento/store/depto.service';
import {FuseCardModule} from '@s-fuse/card';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ModPuestoComponent} from '@s-dirAdmonFinanzas/departamento/components/mod-puesto/mod-puesto.component';

@Component({
    standalone: true,
    exportAs: 'app-lista-deptos',
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            NgxUiLoaderModule,
            FuseCardModule,
            MatCardModule,
            MatListModule,
            MatTooltipModule,
            MatInputModule,
            ReactiveFormsModule,
        ],
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss']
})
export class ListaDeptosComponent implements OnInit
{
    idLoader = loaderDeptos;

    constructor(public deptoService: DeptoService, private dRef: MatDialog, public entityDepto: DeptoEntity)
    {

    }

    ngOnInit(): void
    {
        this.deptoService.departamentos().subscribe();
    }

    trackByFn(index: number, item: IDepto): string | number
    {
        return item._id || index;
    }

    editar(data: IDepto): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: data._id});
    }

    nuevoPuesto(data: IDepto): void
    {
        this.entityDepto.patchState({data});
        this.dRef.open(ModPuestoComponent, {width: '40%'});
    }
}
