import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { fuseAnimations } from '@s-fuse/public-api';
import { FormsModule } from '@angular/forms';
import { loaderPlaneacion } from '@s-dir-general/store/planeacion.service';
import { PlaneacionQuery } from '@s-dir-general/store/planeacion.query';
import { IMirCuestionario } from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, FormsModule],
    providers: [],
    templateUrl: './lista-tab-mir.component.html',
    styleUrls: ['./lista-tab-mir.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaTabMirComponent
{
    @Output() abrirPanel = new EventEmitter<boolean>();
    loader = loaderPlaneacion;
    mirSeleccionado: IMirCuestionario;
    indice = 0;

    constructor(public planeacionQuery: PlaneacionQuery)
    {
    }

    trackByFn(index: number): string | number
    {
        return index;
    }

    nuevoElemento()
    {
        this.abrirPanel.emit(true);
    }

    editarRegistro(): void
    {
        console.log('Mir seleccionado', this.mirSeleccionado);
    }

    eliminarReg(): void
    {

    }
}
