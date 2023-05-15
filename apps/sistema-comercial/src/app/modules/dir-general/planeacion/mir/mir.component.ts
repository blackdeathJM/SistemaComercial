import {ChangeDetectionStrategy, Component, OnDestroy, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModMirComponent} from '@s-dir-general/mir/mod-mir/mod-mir.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModMultiplesSeleccionesComponent} from '@s-dir-general/mod-multiples-selecciones/mod-multiples-selecciones.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ListaTabMirComponent} from '@s-dir-general/mir/lista-tab-mir/lista-tab-mir.component';
import {AccionesMirPbrComponent} from '@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component';
import {ModInicialzarRegistroComponent} from '@s-dir-general/mod-inicialzar-registro/mod-inicialzar-registro.component';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {fuseAnimations} from "@s-fuse/public-api";
import {Subscription} from "rxjs";

export const abrirPanelMir = signal<boolean>(false)
@Component({
    selector: 'app-mir',
    standalone: true,
    imports: [CommonModule, MatSidenavModule, AccionesMirPbrComponent, ModMirComponent, MatButtonToggleModule, MatIconModule, ListaTabMirComponent],
    providers: [],
    templateUrl: './mir.component.html',
    animations: [fuseAnimations],
    styleUrls: ['./mir.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MirComponent implements OnDestroy
{
    abrirPanel = abrirPanelMir;
    sub: Subscription = new Subscription();

    constructor(public mdr: MatDialog, public planeacionQuery: PlaneacionQuery)
    {
    }

    regSeleccion(): void
    {
        this.mdr.open(ModMultiplesSeleccionesComponent, {width: '70%'});
    }

    inicializarPlaneacion(): void
    {
        this.mdr.open(ModInicialzarRegistroComponent, {width: '40%'});
    }


    ngOnDestroy(): void
    {
        abrirPanelMir.set(false);
        this.planeacionQuery.centroGestor.set(null);
    }
}
