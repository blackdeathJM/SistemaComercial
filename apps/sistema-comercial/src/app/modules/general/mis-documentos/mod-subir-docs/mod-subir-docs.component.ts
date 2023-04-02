import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Archivos} from '#/libs/models/src/lib/general/documentos/documento';
import {getDownloadURL} from '@angular/fire/storage';
import {finalize, startWith, Subscription} from 'rxjs';
import {GeneralService} from '#/apps/sistema-comercial/src/services/general.service';
import {NgxToastService} from '#/apps/sistema-comercial/src/services/ngx-toast.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AuthEntity} from '@s-core/auth/store/auth.entity';
import {EntityMisDocumentosStore} from '@s-general/store/entity-mis-documentos.store';
import {MisDocumentosService} from '@s-general/store/mis-documentos.service';
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

@Component({
    selector: 'app-mod-subir-docs',
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            MatFormFieldModule,
            MaterialFileInputModule,
            MatIconModule,
            RegistrosComponent,
            ReactiveFormsModule,
            RxReactiveFormsModule,
            MatDialogModule,
            NgIf,
            MatProgressBarModule,
        ],
    templateUrl: './mod-subir-docs.component.html',
    styleUrls: ['./mod-subir-docs.component.scss']
})
export class ModSubirDocsComponent implements OnInit, OnDestroy
{
    formDocsArchivo: FormGroup;
    cargando = false;
    advertencia: string = '';
    porcentaje: number = 0;
    subs: Subscription = new Subscription();
    mostrarProgreso: boolean = false;

    constructor(private fb: RxFormBuilder, private dRef: MatDialogRef<ModSubirDocsComponent>, private ngxToast: NgxToastService, private misDocumentosService: MisDocumentosService,
                private cdr: ChangeDetectorRef, public generalServices: GeneralService, private stateAuth: AuthEntity, public entityMisDocumentos: EntityMisDocumentosStore)
    {
    }

    ngOnInit(): void
    {
        this.formDocsArchivo = this.fb.formGroup(new Archivos());

        this.subs.add(this.generalServices.progreso().pipe(startWith(0)).subscribe((r) =>
        {
            this.porcentaje = r;
            this.cdr.detectChanges();
        }));

        if (this.entityMisDocumentos.snapshot.documento.enviadoPor !== this.stateAuth.snapshot._id)
        {
            this.formDocsArchivo.get('docArchivo').disable();
            this.advertencia = 'Este documento solo puede ser modificado por la persona que lo subio';
        }
    }

    async reemplazar(esRemoto: boolean): Promise<void>
    {
        const {docArchivo, acuseArchivo} = this.formDocsArchivo.value;

        if (!docArchivo && !acuseArchivo)
        {
            this.ngxToast.alertaToast('No se ha seleccionado ningun archivo', 'Reemplazo de archivos');
            return;
        }

        this.cargando = true;
        this.formDocsArchivo.disable();

        let docUrl: string = null;
        let acuseUrl: string = null;
        let docArch: File[] = null;
        let acuseArch: File[] = null;
        if (esRemoto)
        {
            if (docArchivo)
            {
                if (checkValueIsFilled(this.entityMisDocumentos.snapshot.documento.docUrl))
                {
                    await this.generalServices.eliminarDocFirabase(this.entityMisDocumentos.snapshot.documento.docUrl);
                }
                try
                {
                    this.mostrarProgreso = true;
                    const ruta = GeneralService.rutaGuardar(this.entityMisDocumentos.snapshot.documento.tipoDoc, docArchivo._files[0].name, 'documentos');
                    const doc = await this.generalServices.subirFirebase(docArchivo._files[0], ruta);
                    docUrl = await getDownloadURL(doc.ref);
                } catch (e)
                {
                    this.ngxToast.errorToast(e.message, 'Error al obtener url del documento');
                    this.dRef.close();
                }
            }
            if (acuseArchivo)
            {
                if (checkValueIsFilled(this.entityMisDocumentos.snapshot.documento.acuseUrl))
                {
                    try
                    {
                        await this.generalServices.eliminarDocFirabase(this.entityMisDocumentos.snapshot.documento.acuseUrl);
                    } catch (e)
                    {
                        this.ngxToast.errorToast(e, 'Ocurrio un error al tratar de eminar el documento');
                    }
                }
                try
                {
                    this.mostrarProgreso = true;
                    const ruta = GeneralService.rutaGuardar(this.entityMisDocumentos.snapshot.documento.tipoDoc, acuseArchivo._files[0].name, 'documentos');
                    const acuse = await this.generalServices.subirFirebase(acuseArchivo._files[0], ruta);
                    acuseUrl = await getDownloadURL(acuse.ref);
                } catch (e)
                {
                    this.ngxToast.errorToast(e.message, 'Error al obtener la url');
                    this.dRef.close();
                }
            }
        } else
        {
            if (docArchivo)
            {
                docArch = docArchivo._files;
            }
            if (acuseArchivo)
            {
                acuseArch = acuseArchivo._files;
            }
        }
        const actDocs =
            {
                _id: this.entityMisDocumentos.snapshot.documento._id,
                docUrl,
                acuseUrl,
            };
        this.misDocumentosService.subirDocs(actDocs, docArch, acuseArch).pipe(finalize(() =>
        {
            this.cargando = false;
            this.formDocsArchivo.enable();
            this.dRef.close();
        })).subscribe();
    }


    cancelar(): void
    {
        if (this.cargando)
        {
            return;
        }
        this.dRef.close();
    }

    ngOnDestroy(): void
    {
        this.subs.unsubscribe();
    }
}
