import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatIconModule} from '@angular/material/icon';
import {RegistrosComponent} from '@s-shared/registros/registros.component';
import {IDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RxFormBuilder, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {Archivos} from '#/libs/models/src/lib/general/documentos/documento';

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDocumento, private fb: RxFormBuilder)
    {
    }

    ngOnInit(): void
    {
        this.formDocsArchivo = this.fb.formGroup(new Archivos());
        if (this.data)
        {

        }
    }
}
