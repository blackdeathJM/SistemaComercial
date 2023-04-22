import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModAvancesMirComponent} from '@s-dir-general/mir/mod-avances-mir/mod-avances-mir.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {fuseAnimations} from '@s-fuse/public-api';
import {FormsModule} from '@angular/forms';
import {loaderPlaneacion} from "@s-dir-general/store/planeacion.service";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";

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
    mirSeleccionado: IMirCuestionario[];
    indice = 0;

    constructor(private mdr: MatDialog, public planeacionQuery: PlaneacionQuery)
    {
    }

    trackByFn(index: number): string | number
    {
        return index;
    }

    regAvances(): void
    {
        // this.mirStore.setActive(this.mirSeleccionado._id);
        this.mdr.open(ModAvancesMirComponent, {width: '45%'});
    }

    cambiarSeleccion(e: number)
    {
        console.log('TabGroup', e);
    }

    nuevoElemento()
    {
        this.abrirPanel.emit(true)
    }
}
