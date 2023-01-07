import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-admin/components/mod-depto/mod-depto.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {EntityDeptoStore} from '@s-admin/store/entity-depto.store';
import {DeptoService} from '@s-admin/store/depto.service';

@Component({
    standalone: true,
    exportAs: 'app-lista-deptos',
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            TailwindLoadingComponent,
            NgxUiLoaderModule,
        ],
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaDeptosComponent implements OnInit
{
    constructor(public deptoService: DeptoService, private dRef: MatDialog, public entityDepto: EntityDeptoStore)
    {

    }

    ngOnInit(): void
    {
        this.deptoService.departamentos().subscribe();
    }

    trackByFn(index: number, item: IDepto): string
    {
        return item._id;
    }

    editar(depto: IDepto): void
    {
        this.dRef.open(ModDeptoComponent, {width: '40%', data: depto});
    }
}
