import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IResolveDocumento} from '#/libs/models/src/lib/general/documentos/documento.interface';
import {MatDialog} from '@angular/material/dialog';
import {ListaDetalleComponent} from '@s-shared/plantillas/lista-detalle/lista-detalle.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FuseCardModule} from '@s-fuse/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TailwindLoadingComponent} from '@s-shared/tailwind-loading/tailwind-loading.component';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ConvertirTimestamUnixPipe} from '#/apps/sistema-comercial/src/app/pipes/convertir-timestam-unix.pipe';
import {DetalleDocumentosComponent} from '@s-general/detalle-documentos/detalle-documentos.component';
import {ModDocumentosComponent} from '@s-general/mod-documentos/mod-documentos.component';
import {ListaDocumentosComponent} from '@s-general/lista-documentos/lista-documentos.component';
import {DocConsultaComponent} from '@s-general/doc-consulta/doc-consulta.component';

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
            MatFormFieldModule,
            MatInputModule,
            RxReactiveFormsModule,
            ReactiveFormsModule,
            MatDatepickerModule,
            MatLuxonDateModule,
            MatCheckboxModule,
            ListaDocumentosComponent,
            DocConsultaComponent
        ],
    selector: 'app-mis-documentos',
    templateUrl: './mis-documentos.component.html',
    styleUrls: ['./mis-documentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MisDocumentosComponent
{
    docSeleccionado: IResolveDocumento;
    abrirP: boolean = false;

    constructor(private dRef: MatDialog)
    {
    }

    cerrarP(evento: boolean): void
    {
        this.abrirP = evento;
    }

    nuevosDocs(): void
    {
        this.dRef.open(ModDocumentosComponent, {width: '40%', data: null, hasBackdrop: false});
    }
}
