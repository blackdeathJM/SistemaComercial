import {AfterViewInit, ChangeDetectionStrategy, Component, InjectionToken, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseCardModule} from '@s-fuse/card';
import {FuseAlertModule} from '@s-fuse/alert';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {loaderMisDocs, MisDocumentosService} from '@s-general/store/mis-documentos.service';
import {SinDatosComponent} from '@s-shared/sin-datos/sin-datos.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {TablaMatComponent} from '@s-shared/components/tabla-mat/tabla-mat.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {ImgDefectoPipe} from '#/apps/sistema-comercial/src/app/pipes/img-defecto.pipe';
import {MisDocsQuery} from '@s-general/store/mis-docs.query';
import {MisDocsStore} from '@s-general/store/mis-docs.store';

export const LISTA_DOCS_TOKEN = new InjectionToken<ListaDocumentosComponent>('lista-docs-token');

@Component({
    selector: 'app-lista-documentos',
    standalone: true,
    imports: [CommonModule, FuseCardModule, FuseAlertModule, MatTooltipModule, ConvertirTimestamUnixPipe, NgxUiLoaderModule, SinDatosComponent, MatIconModule,
        MatTableModule, MatSortModule, TablaMatComponent, MatPaginatorModule, ImgDefectoPipe],
    templateUrl: './lista-documentos.component.html',
    styleUrls: ['./lista-documentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{provide: LISTA_DOCS_TOKEN, useExisting: ListaDocumentosComponent}]
})
export class ListaDocumentosComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    loaderListaDocs = loaderMisDocs;
    dataSource = new MatTableDataSource<IResolveDocumento>([]);
    columnasMostrar: string[] = ['nombreCompleto', 'asunto', 'identificadorDoc', 'dependencia', 'usuarios', 'proceso'];
    sub = new Subscription();

    constructor(public misDocsQuery: MisDocsQuery, private misDocsService: MisDocumentosService, private misDocsStore: MisDocsStore)
    {
    }

    ngOnInit(): void
    {
        this.sub.add(this.misDocsService.docUsuarioProceso('pendiente', false).subscribe());
        this.sub.add(this.misDocsQuery.selectAll().subscribe(r => this.dataSource.data = r));
    }

    ngAfterViewInit(): void
    {
        this.dataSource.paginator = this.paginator;
    }

    seleccionarDoc(documento: IResolveDocumento): void
    {
        // al seleccionar la fila parcho el estado para mostrar el detalle del documento en la venta que se despliega a la derecha
        // this.entityMisDocumentos.patchState({documento});
        this.misDocsStore.setActive(documento._id);
        // Al seleccionar el documento se abre la venta de la derecha
        this.misDocsService.setPanel = true;
    }

    trackByFn(index: number, item: any): any
    {
        return item._id || index;
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
        // Al momento que salgo del componente cierro el panel de la derecha para que si vuelve el usuario a seleccionar una fila se vuelva abrir
        this.misDocsService.setPanel = false;
    }
}
