import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
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
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {ListaSumPbrComponent} from "@s-dir-general/mir/lista-tab-mir/lista-sum-pbr/lista-sum-pbr.component";
import {ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {MatDialog} from "@angular/material/dialog";
import {ModSumatoriasComponent} from "@s-dir-general/mir/mod-sumatorias/mod-sumatorias.component";
import {IEditarSumatoriaPBR} from "@s-dir-general/store/planeacion.interface";
import {Subscription} from "rxjs";

export const abrirPanelPbr = signal<boolean>(false);

@Component({
    selector: 'app-pbr',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatButtonToggleModule, MatIconModule, MatSidenavModule, ModPbrComponent, MatListModule, ListaPbrComponent, MatButtonModule, ListaSumPbrComponent],
    providers: [],
    templateUrl: './pbr.component.html',
    styleUrls: ['./pbr.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PbrComponent
{
    pbrSumatorias: ISumatorias[] = [];
    abrirPanel = abrirPanelPbr;
    sub: Subscription = new Subscription();

    constructor(private planeacionStore: PlaneacionStore, public planeacionQuery: PlaneacionQuery, private ngxToast: NgxToastService, private mdr: MatDialog)
    {

    }

    sumatoria(): void
    {
        if (!this.planeacionQuery.getActive())
        {
            this.ngxToast.alertaToast('Debes seleccionar el año del ejercicio', 'Sumatorias');
            return;
        }
        const data: IEditarSumatoriaPBR =
            {
                idSumatoria: null,
                actualizar: false
            }
        this.mdr.open(ModSumatoriasComponent, {width: '40%', data});
    }
}
