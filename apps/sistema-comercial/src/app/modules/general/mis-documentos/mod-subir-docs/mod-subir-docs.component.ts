import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {IDocumento, IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Archivos} from '#/libs/models/src/lib/general/documentos/documento';
import {NgxToastService} from '#/libs/services/src/lib/services/ngx-toast.service';
import {deleteObject, getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {GeneralService} from '@s-app/services/general.service';
import {SubirDocsGQL} from '#/libs/datos/src';
import {tap} from 'rxjs';
import {unionBy} from 'lodash-es';
import {STATE_DOCS} from '@s-app/general/general.state';

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
            RxReactiveFormsModule
        ],
    templateUrl: './mod-subir-docs.component.html',
    styleUrls: ['./mod-subir-docs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModSubirDocsComponent implements OnInit
{
    formDocsArchivo: FormGroup;
    cargando = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDocumento, private fb: RxFormBuilder, private mdr: MatDialogRef<ModSubirDocsComponent>, private ngxService: NgxToastService,
                private storage: Storage, private subirDocsGQL: SubirDocsGQL)
    {
    }

    ngOnInit(): void
    {
        this.formDocsArchivo = this.fb.formGroup(new Archivos());
    }

    async reemplazar(esRemoto: boolean): Promise<void>
    {
        const {docArchivo, acuseArchivo} = this.formDocsArchivo.value;
        if (!docArchivo && !acuseArchivo)
        {
            this.ngxService.alertaToast('No haz seleccionado ningun archivo en ninguna de las dos opciones', 'Reemplazo de archivos');
            return;
        }
        this.cargando = true;
        this.formDocsArchivo.disable();
        let docUrl: string = null;
        let acuseUrl: string = null;
        let filesDocUrl = null;
        let filesAcuseUrl = null;
        const carpeta = 'documentos';
        if (esRemoto)
        {
            if (docArchivo)
            {
                try
                {
                    if (this.data.docUrl)
                    {
                        const eliminarDocUrl = ref(this.storage, this.data.docUrl);
                        deleteObject(eliminarDocUrl).then().catch(err => this.ngxService.errorToast(`Ocurrio un error: ${err}`, 'Eliminar doc'));
                    }
                    const docRef = ref(this.storage, GeneralService.rutaGuardar(this.data.tipoDoc, docArchivo._files[0].name, carpeta));
                    const subirDoc = await uploadBytes(docRef, docArchivo._files[0]);
                    docUrl = await getDownloadURL(subirDoc.ref);
                } catch (e)
                {
                    this.ngxService.errorToast(`Ocurrio un error inesperado${e}`, 'Reemplazo de docs');
                }
            }

            if (acuseArchivo)
            {
                try
                {
                    if (this.data.acuseUrl)
                    {
                        const eliminarAcuse = ref(this.storage, this.data.acuseUrl);
                        deleteObject(eliminarAcuse).then().catch(err => this.ngxService.errorToast(`Error al tratar de eliminar acuse: ${err}`, 'Eliminar acuse'));
                    }
                    const acuseRef = ref(this.storage, GeneralService.rutaGuardar(this.data.tipoDoc, acuseArchivo._files[0].name, carpeta));
                    const acuseSubir = await uploadBytes(acuseRef, acuseArchivo.files[0]);
                    acuseUrl = await getDownloadURL(acuseSubir.ref);
                } catch (e)
                {
                    this.ngxService.errorToast(`Ocurrio un error inesperado: ${e}`, 'Reemplazar Acuse');
                }
            }
        } else
        {
            if (docArchivo)
            {
                filesDocUrl = docArchivo._files;
            }
            if (acuseArchivo)
            {
                filesAcuseUrl = acuseArchivo._files;
            }
        }
        const actDocs =
            {
                _id: this.data._id,
                docUrl,
                acuseUrl,
            };
        this.subirDocsGQL.mutate({args: actDocs, files: {file: filesDocUrl, carpeta}, filesAcuse: {file: filesAcuseUrl, carpeta}}).pipe(tap((res) =>
        {
            if (res.data)
            {
                unionBy(STATE_DOCS(), res.data.subirDocs as IResolveDocumento);
                this.ngxService.satisfactorioToast('La subida de archivos se realizo con exito', 'Subida de archivos');
                this.mdr.close(res.data.subirDocs);
            }
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
        this.mdr.close();
    }
}
