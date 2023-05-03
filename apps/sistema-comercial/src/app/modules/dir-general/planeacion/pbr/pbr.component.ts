import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ModPbrComponent} from '@s-dir-general/pbr/mod-pbr/mod-pbr.component';
import {MatListModule} from '@angular/material/list';
import {ListaPbrComponent} from '@s-dir-general/pbr/lista-pbr/lista-pbr.component';
import {MatButtonModule} from '@angular/material/button';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {ValoresCamposMod} from '@s-dir-general/store/planeacion.service';

@Component({
    selector: 'app-pbr',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatButtonToggleModule, MatIconModule, MatSidenavModule, ModPbrComponent, MatListModule, ListaPbrComponent, MatButtonModule],
    providers: [],
    templateUrl: './pbr.component.html',
    styleUrls: ['./pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PbrComponent
{
    abrirPanel = false;
    planeacion: IPlaneacion = null;

    constructor(private planeacionStore: PlaneacionStore, private planeacionQuery: PlaneacionQuery, private ngxToast: NgxToastService)
    {

    }

    seleccionarPlaneacion(e: IPlaneacion): void
    {
        this.planeacion = e;
        this.planeacionStore.setActive(e._id);
    }

    filCentroGestorPbr(e: string): void
    {
        if (!this.planeacion)
        {
            this.ngxToast.alertaToast('Es necesario seleccionar el año del ejercicio para poder filtrar por centro gestor', 'PBR');
            return;
        }
        this.planeacion = this.planeacionQuery.filPlaneacionDinamica(ValoresCamposMod.pbrCuestionario, ValoresCamposMod.centroGestor, e);
    }
}
