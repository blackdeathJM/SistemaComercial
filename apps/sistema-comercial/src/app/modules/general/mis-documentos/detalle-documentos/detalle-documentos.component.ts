import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IDocActFolio, IDocumento, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FuseConfirmationConfig, FuseConfirmationService} from '@s-fuse/confirmation';
import {confirmarFinalizarDoc, confirmarFolio} from '@s-app/general/mis-documentos/detalle-documentos/dialogConfirmacion';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ConvertirTimestamUnixPipe} from '@s-app/pipes/convertir-timestam-unix.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModSubirDocsComponent} from '@s-app/general/mis-documentos/mod-subir-docs/mod-subir-docs.component';
import {STATE_DATOS_SESION} from '@s-app/auth/auth.state';
import {NgxToastService} from '@s-app/services/ngx-toast.service';
import {DocActFolioGQL, DocFinalizarGQL} from '#/libs/datos/src';
import {tap} from 'rxjs';
import {unionBy} from 'lodash-es';
import {STATE_DOCS} from '@s-app/general/general.state';
import {ModDocRefComponent} from '@s-app/general/mis-documentos/mod-doc-ref/mod-doc-ref.component';
import {ModReasignacionComponent} from '@s-app/general/mis-documentos/mod-reasignacion/mod-reasignacion.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    @Output() cerrarPanel = new EventEmitter<boolean>();
    _documento: IResolveDocumento;
    confFolio: FuseConfirmationConfig = confirmarFolio;
    confFinalizarDoc: FuseConfirmationConfig = confirmarFinalizarDoc;
    cargando = false;

    constructor(private dRef: MatDialog, private confirmacionService: FuseConfirmationService, private ngxToastService: NgxToastService, private docActFolioGQL: DocActFolioGQL,
                private docFinalizarGQL: DocFinalizarGQL)
    {
    }

    @Input() set documento(v: IResolveDocumento)
    {
        this._documento = v;
    }

    cerrarP(): void
    {
        this.cerrarPanel.emit(false);
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
                        deptoId: STATE_DATOS_SESION().deptoId,
                        usuarioFolio: STATE_DATOS_SESION()._id,
                        tipoDoc: _documento.tipoDoc
                    };
                this.docActFolioGQL.mutate({args}).pipe(tap((docFoliado) =>
                {
                    if (docFoliado.data)
                    {
                        unionBy(STATE_DOCS(), docFoliado.data.docActFolio as IResolveDocumento);
                        this._documento = docFoliado.data.docActFolio as IResolveDocumento;
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
                    if (docFinalizado.data)
                    {
                        unionBy(STATE_DOCS(), docFinalizado.data.docFinalizar as IResolveDocumento);
                        this._documento = docFinalizado.data.docFinalizar as IResolveDocumento;
                        this.ngxToastService.satisfactorioToast('El documento ha finalizado con exito', 'Finalizar documentos');
                    }
                })).subscribe();
            }
        });
    }

    reasignacion(data: IResolveDocumento): void
    {
        if (data.enviadoPor !== STATE_DATOS_SESION()._id)
        {
            this.ngxToastService.alertaToast('Solo puedes reasignar usuarios a los documentos que tu hayas registrado', 'Reasignacion de usuarios');
            return;
        }
        this.dRef.open(ModReasignacionComponent, {width: '40%', data}).afterClosed().pipe(tap((res) =>
        {
            if (res)
            {
                this._documento = res;
                if (this._documento.acuseUrl)
                {
                    this.ngxToastService.infoToast('El documento se ha dado por terminado con exito', 'Termino de procesos');
                }
            }
        })).subscribe();

    }

    modDocs(data: IResolveDocumento): void
    {
        this.dRef.open(ModSubirDocsComponent, {width: '40%', data}).afterClosed().subscribe((res: IResolveDocumento) =>
        {
            if (res)
            {
                this._documento = res;
            }
        });
    }

    docRef(data: IResolveDocumento): void
    {
        this.dRef.open(ModDocRefComponent, {width: '40%', data}).afterClosed().subscribe((res: IResolveDocumento[]) =>
        {
            res.map((value) =>
            {
                unionBy(STATE_DOCS(), value);
                if (data._id === value._id)
                {
                    data = value;
                }
            });
        });
    }
}
