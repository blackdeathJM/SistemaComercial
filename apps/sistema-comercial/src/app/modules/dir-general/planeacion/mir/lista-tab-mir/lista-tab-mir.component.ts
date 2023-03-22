import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModAvancesMirComponent} from '@s-dir-general/mir/mod-avances-mir/mod-avances-mir.component';
import {EntityMir} from '@s-dir-general/mir/store/mir.entity';
import {loaderMirs, MirService} from '@s-dir-general/mir/store/mir.service';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {IMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface';
import {fuseAnimations} from '@s-fuse/public-api';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-lista-tab-mir',
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, FormsModule],
    providers: [MirService],
    templateUrl: './lista-tab-mir.component.html',
    styleUrls: ['./lista-tab-mir.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaTabMirComponent
{
    loader = loaderMirs;
    mirSeleccionado: IMir = null;
    indice = 0;

    constructor(private mdr: MatDialog, public entityMir: EntityMir, private mirService: MirService)
    {
    }

    trackByFn(index: number, elemento: IMir): string | number
    {
        return elemento._id || index;
    }

    regAvances(): void
    {
        this.entityMir.seleccionarMir(this.mirSeleccionado._id);
        this.mdr.open(ModAvancesMirComponent, {width: '45%'});
    }
}
