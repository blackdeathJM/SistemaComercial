import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {fuseAnimations} from '@s-fuse/public-api';
import {FormsModule} from '@angular/forms';
import {actualizarMir, ngxLoaderMir, PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, FormsModule, MatTooltipModule],
    providers: [],
    templateUrl: './lista-tab-mir.component.html',
    styleUrls: ['./lista-tab-mir.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaTabMirComponent
{
    @Output() abrirPanel = new EventEmitter<boolean>();
    loader = ngxLoaderMir();
    indice = 0;
    _planeacion: IPlaneacion = null;

    constructor(public planeacionQuery: PlaneacionQuery, private confirmacionService: ConfirmacionService, private planeacionService: PlaneacionService)
    {
    }

    @Input() set planeacion(valor: IPlaneacion)
    {
        this._planeacion = valor;
    }

    trackByFn(index: number): string | number
    {
        return index;
    }

    nuevoElemento(): void
    {
        actualizarMir([false, this.indice]);
        this.abrirPanel.emit(true);
    }

    editarRegistro(): void
    {
        actualizarMir([true, this.indice]);
        this.abrirPanel.emit(true);
    }

    eliminarReg(): void
    {
        this.planeacionService.eliminarElemento(this.indice, ValoresCamposMod.mirCuestionario);
    }

    cambioDeIndiceMir(e: number): void
    {
        this.indice = e;
    }
}
