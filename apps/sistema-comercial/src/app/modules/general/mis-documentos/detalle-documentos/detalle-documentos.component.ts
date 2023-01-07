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
import {Observable, tap} from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {confirmarFinalizarDoc, confirmarFolio} from '@s-general/detalle-documentos/dialogConfirmacion';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {ModReasignacionComponent} from '@s-general/mod-reasignacion/mod-reasignacion.component';
import {ModSubirDocsComponent} from '@s-general/mod-subir-docs/mod-subir-docs.component';
import {ModDocRefComponent} from '@s-general/mod-doc-ref/mod-doc-ref.component';
import {StateAuth} from '@s-core/auth/store/auth.store';
import {Select} from '@ngxs/store';
import {EntityMisDocumentosStore} from '@s-general/entity-mis-documentos.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {STATE_ABRIR_CERRAR_PANEL} from '@s-general/variables-docs.state';

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
            MatProgressSpinnerModule

        ],
    selector: 'app-detalle-documentos',
    templateUrl: './detalle-documentos.component.html',
    styleUrls: ['./detalle-documentos.component.scss']
})
export class DetalleDocumentosComponent
{
    @Select(EntityMisDocumentosStore.documento) documento$: Observable<IResolveDocumento>;
    confFolio: FuseConfirmationConfig = confirmarFolio;
    confFinalizarDoc: FuseConfirmationConfig = confirmarFinalizarDoc;
    cargando = false;

    constructor(private dRef: MatDialog, private confirmacionService: FuseConfirmationService, private ngxToastService: NgxToastService, private docActFolioGQL: DocActFolioGQL,
                private docFinalizarGQL: DocFinalizarGQL, private stateAuht: StateAuth, private entityMisDocumentos: EntityMisDocumentosStore)
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
                        deptoId: this.stateAuht.snapshot.deptoId,
                        usuarioFolio: this.stateAuht.snapshot._id,
                        tipoDoc: _documento.tipoDoc
                    };
                this.docActFolioGQL.mutate({args}).pipe(tap((docFoliado) =>
                {
                    if (isNotNil(docFoliado.data))
                    {
                        const docFol = $cast<IResolveDocumento>(docFoliado.data.docActFolio);
                        this.entityMisDocumentos.updateOne({id: docFol._id, changes: docFol});
                        this.entityMisDocumentos.seleccionarDoc(docFol);
                        this.ngxToastService.satisfactorioToast('Haz registrado un nuevo folio con exito', 'Alta de folios');
                        this.cargando = false;
                    }
                })).subscribe();
            }
        });
    }

    finalizarDoc(_documento: IResolveDocumento): void
    {
        if (_documento.docUrl === null && _documento.acuseUrl === null)
        {
            this.ngxToastService.errorToast('No puedes dar por finalizado el documento por que no tienes ningun documento subido', 'Finalizar documentos');
            return;
        }

        this.confirmacionService.open(this.confFinalizarDoc).afterClosed().subscribe((res) =>
        {
            if (res === 'confirmed')
            {
                this.docFinalizarGQL.mutate({_id: _documento._id}).pipe(tap((docFinalizado) =>
                {
                    if (isNotNil(docFinalizado.data))
                    {
                        const docFin = $cast<IResolveDocumento>(docFinalizado.data.docFinalizar);
                        this.entityMisDocumentos.updateOne({id: docFin._id, changes: docFin});
                        this.entityMisDocumentos.seleccionarDoc(docFin);
                        this.ngxToastService.satisfactorioToast('El documento ha finalizado con exito', 'Finalizar documentos');
                    }
                })).subscribe();
            }
        });
    }

    reasignacion(documento: IResolveDocumento): void
    {
        if (documento.enviadoPor !== this.stateAuht.snapshot._id)
        {
            this.ngxToastService.alertaToast('Solo puedes reasignar usuarios a los documentos que tu hayas registrado', 'Reasignacion de usuarios');
            return;
        }

        this.entityMisDocumentos.seleccionarDoc(documento);

        this.dRef.open(ModReasignacionComponent, {width: '40%', data: documento});

    }

    modDocs(documento: IResolveDocumento): void
    {
        this.entityMisDocumentos.seleccionarDoc(documento);
        this.dRef.open(ModSubirDocsComponent, {width: '40%'});
    }

    docRef(documento: IResolveDocumento): void
    {

        this.entityMisDocumentos.seleccionarDoc(documento);
        this.dRef.open(ModDocRefComponent, {width: '40%'});
    }

    cerrarP(): void
    {
        STATE_ABRIR_CERRAR_PANEL(false);
    }

}
