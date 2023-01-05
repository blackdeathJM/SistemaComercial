import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {IDocumento, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Archivos} from '#/libs/models/src/lib/general/documentos/documento';
import {getDownloadURL} from '@angular/fire/storage';
import {SubirDocsGQL} from '#/libs/datos/src';
import {finalize, startWith, Subscription, tap} from 'rxjs';
import {GeneralService} from '#/apps/sistema-comercial/src/app/services/general.service';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {StateAuth} from '@s-core/auth/auth.store';
import {EntityMisDocumentosStore} from '@s-general/entity-mis-documentos.store';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';

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
    styleUrls: ['./mod-subir-docs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModSubirDocsComponent implements OnInit, OnDestroy
{
    formDocsArchivo: FormGroup;
    cargando = false;
    advertencia: string = '';
    porcentaje: number = 0;
    subs: Subscription = new Subscription();
    mostrarProgreso: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDocumento, private fb: RxFormBuilder, private dRef: MatDialogRef<ModSubirDocsComponent>, private ngxService: NgxToastService
        , private subirDocsGQL: SubirDocsGQL, private cdr: ChangeDetectorRef, public generalServices: GeneralService, private stateAuth: StateAuth,
                private entityMisDocumentos: EntityMisDocumentosStore)
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
            this.ngxService.alertaToast('No se ha seleccionado ningun archivo', 'Reemplazo de archivos');
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
                if (this.data.docUrl)
                {
                    await this.generalServices.eliminarDocFirabase(this.data.docUrl);
                }
                try
                {
                    this.mostrarProgreso = true;
                    const ruta = GeneralService.rutaGuardar(this.data.tipoDoc, docArchivo._files[0].name, 'documentos');
                    const doc = await this.generalServices.subirFirebase(docArchivo._files[0], ruta);
                    docUrl = await getDownloadURL(doc.ref);
                } catch (e)
                {
                    this.ngxService.errorToast(e.message, 'Error al obtener url');
                }
            }
            if (acuseArchivo)
            {
                if (this.data.acuseUrl)
                {
                    await this.generalServices.eliminarDocFirabase(this.data.acuseUrl);
                }
                try
                {
                    this.mostrarProgreso = true;
                    const ruta = GeneralService.rutaGuardar(this.data.tipoDoc, acuseArchivo._files[0].name, 'documentos');
                    const acuse = await this.generalServices.subirFirebase(acuseArchivo._files[0], ruta);
                    acuseUrl = await getDownloadURL(acuse.ref);
                } catch (e)
                {
                    this.ngxService.errorToast(e.message, 'Error al obtener la url');
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
                _id: this.data._id,
                docUrl,
                acuseUrl,
            };
        this.subirDocsGQL.mutate({args: actDocs, files: {file: docArch, carpeta: 'documentos'}, filesAcuse: {file: acuseArch, carpeta: 'documentos'}})
            .pipe(tap((res) =>
            {
                if (isNotNil(res.data))
                {
                    const archivoModificado = $cast<IResolveDocumento>(res.data.subirDocs);
                    this.entityMisDocumentos.updateOne({id: archivoModificado._id, changes: archivoModificado});
                    this.ngxService.satisfactorioToast('La subida de archivos se realizo con exito', 'Subida de archivos');
                }
            }), finalize(() =>
            {
                this.cargando = false;
                this.formDocsArchivo.enable();
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
