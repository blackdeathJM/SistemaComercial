import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {MatDialog} from '@angular/material/dialog';
import {ModDeptoComponent} from '@s-admin/components/mod-depto/mod-depto.component';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';
import {EntityDeptoStore} from '@s-admin/store/entity-depto.store';
import {DeptoService} from '@s-admin/store/depto.service';
import {finalize} from "rxjs";

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
    idLoader: 'listaDeptos';

    constructor(public deptoService: DeptoService, private dRef: MatDialog, public entityDepto: EntityDeptoStore, private ngxLoader: NgxUiLoaderService)
    {

    }

    ngOnInit(): void
    {
        this.ngxLoader.startLoader(this.idLoader);
        this.deptoService.departamentos().subscribe(() => this.ngxLoader.stopLoader(this.idLoader));
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
