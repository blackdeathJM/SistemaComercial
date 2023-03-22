import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModAvancesPbrComponent} from '@s-general/pbr-usuario/mod-avances-pbr/mod-avances-pbr.component';
import {EntityPbr} from '@s-dir-general/pbr/store/pbr.entity';
import {fuseAnimations} from '@s-fuse/public-api';
import {IResPbrEmpleado} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {loaderPbrs} from '@s-dir-general/pbr/store/pbr.service';
import {AvancePbrComponent} from '@s-dir-general/pbr/avance-pbr/avance-pbr.component';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
    selector: 'app-lista-pbr',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatTabsModule, MatButtonModule, MatIconModule, NgxUiLoaderModule, AvancePbrComponent, MatInputModule, MatSidenavModule],
    templateUrl: './lista-pbr.component.html',
    styleUrls: ['./lista-pbr.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaPbrComponent
{
    @Input() visible = false;
    loader = loaderPbrs;

    constructor(private mdr: MatDialog, public entityPbr: EntityPbr)
    {
    }

    regAvances(): void
    {
        this.mdr.open(ModAvancesPbrComponent, {width: '40%'});
    }

    trackByFn(index: number, pbr: IResPbrEmpleado): number | string
    {
        return index || pbr.resPbrEmpleado._id;
    }
}
