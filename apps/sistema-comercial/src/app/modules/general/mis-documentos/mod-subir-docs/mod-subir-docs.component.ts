import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Archivos} from '#/libs/models/src/lib/general/documentos/documento';
import {NgxToastService} from '#/libs/services/src/lib/services/ngx-toast.service';
import {getDownloadURL, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {GeneralService} from '@s-app/services/general.service';

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDocumento, private fb: RxFormBuilder, private mdr: MatDialog, private ngxService: NgxToastService,
                private storage: Storage)
    {
    }

    ngOnInit(): void
    {
        this.formDocsArchivo = this.fb.formGroup(new Archivos());
    }

    async reemplazar(esRemoto: boolean): void
    {
        const {docArchivo, acuseArchivo} = this.formDocsArchivo.value;
        if (!docArchivo && !acuseArchivo)
        {
            this.ngxService.alertaToast('No haz seleccionado ningun archivo en ninguna de las dos opciones', 'Reemplazo de archivos');
            return;
        }
        let doc = null;
        let acuse = null;
        let docUrl = null;
        let acuseUrl = null;
        if (esRemoto)
        {
            if (docArchivo)
            {
                try
                {
                    const docRef = ref(this.storage, GeneralService.rutaGuardar(this.data.tipoDoc, docArchivo._files[0].name, 'documentos'));
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
                    const acuseRef = ref(this.storage, GeneralService.rutaGuardar(this.data.tipoDoc, acuseArchivo._files[0].name, 'documentos'));
                    const acuseSubir = await uploadBytes(acuseRef, acuseArchivo.files[0]);
                    acuseUrl = await getDownloadURL(acuseSubir.ref);
                } catch (e)
                {

                }
            }
        } else
        {

        }
    }

    cancelar(): void
    {
        if (!this.cargando)
        {
            return;
        }
        this.mdr.closeAll();
    }
}
