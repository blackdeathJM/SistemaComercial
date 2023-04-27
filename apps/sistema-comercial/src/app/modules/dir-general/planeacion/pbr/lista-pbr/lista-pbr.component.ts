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
import {AvancePbrComponent} from '@s-dir-general/pbr/avance-pbr/avance-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {ngxLoaderPbr} from "@s-dir-general/store/planeacion.service";

@Component({
    selector: 'app-lista-pbr',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, AvancePbrComponent, MatInputModule, MatSidenavModule],
    templateUrl: './lista-pbr.component.html',
    styleUrls: ['./lista-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaPbrComponent
{
    @Output() panel = new EventEmitter<boolean>;

    @Input() desNuevoReg: boolean = false;
    @Input() desEditarReg: boolean = false;
    @Input() desEliminarReg: boolean = false;

    indice = 0;
    loader = ngxLoaderPbr();

    constructor(private mdr: MatDialog, public planeacionQuery: PlaneacionQuery)
    {
    }

    regAvances(): void
    {
        this.mdr.open(ModAvancesPbrComponent, {width: '40%'});
    }

    trackByFn(index: number): number | string
    {
        return index;
    }

    abrirPanel(): void
    {
        this.panel.emit(true);
    }

    cambioIndicePbr(e: number): void
    {

    }
}
