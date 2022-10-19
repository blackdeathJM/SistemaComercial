import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatDialog} from '@angular/material/dialog';
import {ModDocumentosComponent} from '@s-app/general/mis-documentos/mod-documentos/mod-documentos.component';
import {DocsUsuarioProcesoGQL} from '#/libs/datos/src';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {Subscription, tap} from 'rxjs';
import {STATE_DOCS} from '@s-app/general/general.state';
import {ListaDetalleComponent} from "@s-shared/plantillas/lista-detalle/lista-detalle.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FuseCardModule} from "@s-fuse/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TailwindLoadingComponent} from "@s-shared/tailwind-loading/tailwind-loading.component";
import {ConvertirTimestamUnixPipe} from "@s-app/pipes/convertir-timestam-unix.pipe";
import {CommonModule} from "@angular/common";
import {DetalleDocumentosComponent} from "@s-app/general/mis-documentos/detalle-documentos/detalle-documentos.component";

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            ListaDetalleComponent,
            MatButtonModule,
            MatIconModule,
            FuseCardModule,
            MatTooltipModule,
            TailwindLoadingComponent,
            ConvertirTimestamUnixPipe,
            DetalleDocumentosComponent,
        ],
    selector: 'app-mis-documentos',
    templateUrl: './mis-documentos.component.html',
    styleUrls: ['./mis-documentos.component.scss']
})
export class MisDocumentosComponent implements OnInit, OnDestroy, AfterContentChecked
{
    docs: IDocumento[];
    docSeleccionado: IDocumento;
    abrirP: boolean = false;
    cargandoDatos = true;
    subscripciones: Subscription = new Subscription();

    constructor(private dRef: MatDialog, private docsUsuarioProcesoGQL: DocsUsuarioProcesoGQL)
    {
    }

    ngAfterContentChecked(): void
    {
        this.docs = STATE_DOCS();
    }

    ngOnInit(): void
    {
        this.docsUsuarioProcesoGQL.watch({datos: {ano: new Date().getFullYear(), enviadoPor: STATE_DATOS_SESION()._id}}).valueChanges
            .pipe(tap((res) =>
            {
                this.cargandoDatos = false;
                STATE_DOCS(res.data.docsUsuarioProceso as IDocumento[]);
            })).subscribe();
    }

    seleccionarDoc(doc: IDocumento): void
    {
        this.docSeleccionado = doc;
        this.abrirP = true;
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    cerrarP(evento: boolean): void
    {
        this.abrirP = evento;
    }

    nuevosDocs(): void
    {
        this.dRef.open(ModDocumentosComponent, {width: '40%', data: null});
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
