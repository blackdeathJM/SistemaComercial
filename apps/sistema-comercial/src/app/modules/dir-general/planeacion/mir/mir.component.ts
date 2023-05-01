import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModMirComponent} from '@s-dir-general/mir/mod-mir/mod-mir.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModMultiplesSeleccionesComponent} from '@s-dir-general/mod-multiples-selecciones/mod-multiples-selecciones.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListaTabMirComponent} from '@s-dir-general/mir/lista-tab-mir/lista-tab-mir.component';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {ModInicialzarRegistroComponent} from '@s-dir-general/mod-inicialzar-registro/mod-inicialzar-registro.component';
import {PlaneacionService, ValoresCamposMod} from '@s-dir-general/store/planeacion.service';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';

@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, AccionesMirPbrComponent, ModMirComponent, MatButtonToggleModule, MatIconModule, ListaTabMirComponent],
    providers: [],
    templateUrl: './mir.component.html',
    styleUrls: ['./mir.component.scss']
})
export default class MirComponent
{
    abrirPanel = false;
    planeacion: IPlaneacion = null;

    constructor(public mdr: MatDialog, private ngxToast: NgxToastService, private planeacionService: PlaneacionService, private planeacionQuery: PlaneacionQuery,
                private planeacionStore: PlaneacionStore)
    {
    }

    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '60%'});
    }

    inicializarPlaneacion(): void
    {
        this.mdr.open(ModInicialzarRegistroComponent, {width: '40%'});
    }

    filCentroGestorMir(centroGestor: string): void
    {
        if (!this.planeacion)
        {
            this.ngxToast.alertaToast('Es necesario que selecciones el año', 'Selecciona un año');
            return;
        }
        this.planeacion = this.planeacionQuery.filPlaneacionCentroGestorEmpleado(ValoresCamposMod.mirCuestionario, ValoresCamposMod.centroGestor, centroGestor);
    }

    filAno(e: IPlaneacion): void
    {
        this.planeacion = e;
        this.planeacionStore.setActive(e._id);
    }
}
