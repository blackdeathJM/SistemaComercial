import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ModPbrComponent} from '@s-dir-general/pbr/mod-pbr/mod-pbr.component';
import {MatListModule} from '@angular/material/list';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {PbrService} from '@s-dir-general/pbr/store/pbr.service';
import {TPbrs} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr-consultas.dto';

@Component({
    selector: 'app-pbr',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatButtonToggleModule, MatIconModule, MatSidenavModule, ModPbrComponent, MatListModule, ListaPbrComponent],
    providers: [PbrService],
    templateUrl: './pbr.component.html',
    styleUrls: ['./pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PbrComponent
{
    abrirPanel = false;

    constructor(private pbrService: PbrService)
    {
    }

    filtrarCentroGestor(e: [string, number]): void
    {
        const args: TPbrs =
            {
                centroGestor: e[0],
                ano: e[1],
                idEmpleado: 'noAplica'
            };
        this.pbrService.pbrs(args).subscribe();
    }

    porEmpleado(e: [string, number]): void
    {
        const pbrsEmpleado: TPbrs =
            {
                centroGestor: 'no-aplica',
                idEmpleado: e[0],
                ano: e[1]
            };
        this.pbrService.pbrs(pbrsEmpleado).subscribe();
    }
}
