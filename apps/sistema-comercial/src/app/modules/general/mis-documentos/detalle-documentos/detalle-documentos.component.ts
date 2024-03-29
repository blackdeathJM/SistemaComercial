import {Component} from '@angular/core';
import {IDocActFolio, IDocumento, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DocActFolioGQL, DocFinalizarGQL} from '#/libs/datos/src';
import {finalize} from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {confirmarFinalizarDoc, confirmarFolio} from '@s-general/detalle-documentos/dialogConfirmacion';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {ModReasignacionComponent} from '@s-general/mod-reasignacion/mod-reasignacion.component';
import {ModSubirDocsComponent} from '@s-general/mod-subir-docs/mod-subir-docs.component';
import {ModDocRefComponent} from '@s-general/mod-doc-ref/mod-doc-ref.component';
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {MisDocumentosService} from '@s-general/store/mis-documentos.service';
import {AuthQuery} from '@s-core/auth/store/auth.query';
import {MisDocsQuery} from '@s-general/store/mis-docs.query';
import {MisDocsStore} from '@s-general/store/mis-docs.store';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            ConvertirTimestamUnixPipe,
            MatTooltipModule,
            ReactiveFormsModule,
            MatProgressSpinnerModule,
            DefaultValuePipeModule

        ],
    selector: 'app-detalle-documentos',
    templateUrl: './detalle-documentos.component.html',
    styleUrls: ['./detalle-documentos.component.scss']
})
export class DetalleDocumentosComponent
{
    confFolio: FuseConfirmationConfig = confirmarFolio;
    confFinalizarDoc: FuseConfirmationConfig = confirmarFinalizarDoc;
    cargando = false;

    constructor(private dRef: MatDialog, private confirmacionService: FuseConfirmationService, private ngxToastService: NgxToastService, private docActFolioGQL: DocActFolioGQL,
                private docFinalizarGQL: DocFinalizarGQL, private authQuery: AuthQuery, public misDocsQuery: MisDocsQuery, private misDocsStore: MisDocsStore,
                public misDocService: MisDocumentosService)
    {
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    abrirLink(url: string): void
    {
        if (url)
        {
            window.open(url, '_blank');
        }
    }

    generarFolio(_documento: IDocumento): void
    {
        if (_documento.folio)
        {
            this.ngxToastService.alertaToast('El documento ya cuenta con un folio y no puedes volverlo asignar', 'Asignacion de folio');
            return;
        }

        this.confirmacionService.open(this.confFolio).afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {
                this.cargando = true;
                const args: IDocActFolio =
                    {
                        _id: _documento._id,
                        deptoId: this.authQuery.getValue().deptoId,
                        usuarioFolio: this.authQuery.getValue()._id,
                        tipoDoc: _documento.tipoDoc
                    };
                this.misDocService.docActFolio(args).pipe(finalize(() => this.cargando = false)).subscribe();
            }
        });
    }

    finalizarDoc(documento: IResolveDocumento): void
    {
        if (documento.docUrl === null && documento.acuseUrl === null)
        {
            this.ngxToastService.errorToast('No puedes dar por finalizado el documento por que no tienes ningun documento subido', 'Finalizar documentos');
            return;
        }

        this.confirmacionService.open(this.confFinalizarDoc).afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {
                this.misDocService.finalizarDoc(documento._id).subscribe();
            }
        });
    }

    reasignacion(documento: IResolveDocumento): void
    {
        if (documento.enviadoPor !== this.authQuery.getValue()._id)
        {
            this.ngxToastService.alertaToast('Solo puedes reasignar usuarios a los documentos que tu hayas registrado', 'Reasignacion de usuarios');
            return;
        }

        this.misDocsStore.setActive(documento._id);

        this.dRef.open(ModReasignacionComponent, {width: '40%', data: documento});

    }

    modDocs(documento: IResolveDocumento): void
    {
        // this.entityMisDocumentos.patchState({documento});
        this.misDocsStore.setActive(documento._id);
        this.dRef.open(ModSubirDocsComponent, {width: '40%', hasBackdrop: true, disableClose: true});
    }

    docRef(documento: IResolveDocumento): void
    {

        // this.entityMisDocumentos.patchState({documento});
        this.misDocsStore.setActive(documento._id);
        this.dRef.open(ModDocRefComponent, {width: '40%'});
    }
}
