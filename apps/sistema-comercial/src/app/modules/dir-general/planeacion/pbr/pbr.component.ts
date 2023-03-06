import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ModPbrComponent} from '@s-dir-general/pbr/mod-pbr/mod-pbr.component';

@Component({
    selector: 'app-pbr',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatButtonToggleModule, MatIconModule, MatSidenavModule, ModPbrComponent],
    templateUrl: './pbr.component.html',
    styleUrls: ['./pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PbrComponent
{
    abrirPanel = false;

    constructor()
    {
    }
}
