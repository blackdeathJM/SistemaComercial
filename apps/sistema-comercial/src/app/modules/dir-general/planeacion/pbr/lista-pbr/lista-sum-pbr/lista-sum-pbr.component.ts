import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuseAlertModule} from "@s-fuse/alert";
import {MatCardModule} from "@angular/material/card";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {MatGridListModule} from "@angular/material/grid-list";
import {IEditarSumatoriaPBR} from "@s-dir-general/store/planeacion.interfaces";
import {MatDialog} from "@angular/material/dialog";
import {ModSumatoriasComponent} from "@s-dir-general/mir/mod-sumatorias/mod-sumatorias.component";

@Component({
    selector: 'app-lista-sum-pbr',
    standalone: true,
    imports: [CommonModule, FuseAlertModule, MatCardModule, MatButtonModule, MatIconModule, MatGridListModule],
    templateUrl: './lista-sum-pbr.component.html',
    styleUrls: ['./lista-sum-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaSumPbrComponent
{
    @Input({required: true}) set sumatoriaPbr(v: ISumatorias)
    {
        this._sumatoria = v;
    }

    _sumatoria: ISumatorias

    constructor(private mdr: MatDialog)
    {
    }

    editarSumatoriaPbr(): void
    {
        const data: IEditarSumatoriaPBR =
            {
                idSumatoria: this._sumatoria.idSumatoria,
                actualizar: true
            }
        this.mdr.open(ModSumatoriasComponent, {width: '40%', data, hasBackdrop: true, disableClose: true})
    }
}
