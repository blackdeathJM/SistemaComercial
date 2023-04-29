import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';
import {fuseAnimations} from '@s-fuse/public-api';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {actualizarPbr, ngxLoaderPbr} from '@s-dir-general/store/planeacion.service';
import {CalculosPipePbr} from '@s-dir-general/pbr/pipes/calculosPbr.pipe';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';

@Component({
    selector: 'app-lista-pbr',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, MatInputModule, MatSidenavModule, CalculosPipePbr],
    templateUrl: './lista-pbr.component.html',
    styleUrls: ['./lista-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaPbrComponent
{
    @Output() panel = new EventEmitter<boolean>();

    @Input() desNuevoReg: boolean = false;
    @Input() desEditarReg: boolean = false;
    @Input() desEliminarReg: boolean = false;

    _planeacion: IPlaneacion;

    indice = 0;
    loader = ngxLoaderPbr();

    constructor(private mdr: MatDialog, public planeacionQuery: PlaneacionQuery)
    {
    }

    @Input() set planeacion(valor: IPlaneacion)
    {
        this._planeacion = valor;
    }

    regAvances(): void
    {
        this.mdr.open(ModAvancesPbrComponent, {width: '40%'});
    }

    trackByFn(index: number): number
    {
        return index;
    }

    abrirPanel(): void
    {
        actualizarPbr([false, this.indice]);
        this.panel.emit(true);
    }

    cambioIndicePbr(e: number): void
    {
        this.indice = e;
    }

    editarPbr(): void
    {
        actualizarPbr([true, this.indice]);
        this.panel.emit(true);
    }

    eliminarPbr(): void
    {

    }
}
