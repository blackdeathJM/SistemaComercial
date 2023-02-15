import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {DetalleDocumentosComponent} from '@s-general/detalle-documentos/detalle-documentos.component';
import {ModDocumentosComponent} from '@s-general/mod-documentos/mod-documentos.component';
import {ListaDocumentosComponent} from '@s-general/lista-documentos/lista-documentos.component';
import {DocConsultaComponent} from '@s-general/doc-consulta/doc-consulta.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {FuseMediaWatcherService} from '@s-fuse/media-watcher';
import {Subject, takeUntil} from 'rxjs';
import {MisDocumentosService} from '@s-general/store/mis-documentos.service';

@Component({
    standalone: true,
    imports:
        [
            CommonModule, DetalleDocumentosComponent, ListaDocumentosComponent, DocConsultaComponent, MatButtonModule, MatIconModule, MatSidenavModule
        ],
    selector: 'app-mis-documentos',
    templateUrl: './mis-documentos.component.html',
    styleUrls: ['./mis-documentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MisDocumentosComponent implements OnDestroy, OnInit
{
    @ViewChild('matDrawerDocs', {static: true}) matDrawerDocs: MatDrawer;
    drawerMode: 'side' | 'over';
    sub = new Subject<any>();

    constructor(private dRef: MatDialog, private crd: ChangeDetectorRef, private fuseMediaWatcherService: FuseMediaWatcherService, public misDocService: MisDocumentosService)
    {
    }

    ngOnInit(): void
    {
        this.matDrawerDocs.openedChange.subscribe((abierto) =>
        {
            if (!abierto)
            {
                this.crd.reattach();
            }
        });
        this.fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this.sub)).subscribe(({matchingAliases}) =>
        {
            if (matchingAliases.includes('lg'))
            {
                this.drawerMode = 'side';
            } else
            {
                this.drawerMode = 'over';
            }
        });
    }

    nuevosDocs(): void
    {
        this.dRef.open(ModDocumentosComponent, {width: '40%', hasBackdrop: true, disableClose: true});
    }

    ngOnDestroy(): void
    {
        this.sub.next(false);
        this.sub.complete();
    }
}
