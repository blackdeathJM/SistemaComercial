import {Component, OnInit} from '@angular/core';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {EntityDeptoStore} from '@s-admin/entity-depto.store';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-admin/components/mod-depto/mod-depto.component';

@Component({
    standalone: true,
    exportAs: 'app-lista-deptos',
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            TailwindLoadingComponent,
        ],
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss'],
})
export class ListaDeptosComponent implements OnInit
{
    constructor(public entityDeptoStore: EntityDeptoStore, private dRef: MatDialog)
    {

    }

    ngOnInit(): void
    {
        this.entityDeptoStore.cargarDeptos();
    }

    trackByFn(index: number, item: IDepto): string
    {
        return item._id;
    }

    editar(data: IDepto): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data});
    }
}
