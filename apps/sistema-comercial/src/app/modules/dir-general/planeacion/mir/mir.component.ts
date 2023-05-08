import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, signal} from '@angular/core';
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
export default class MirComponent implements AfterViewInit, OnDestroy
{
    planeacion: IPlaneacion = null;
    abrirPanel = abrirPanelMir;
    sub: Subscription = new Subscription();

    constructor(public mdr: MatDialog, private ngxToast: NgxToastService, private planeacionService: PlaneacionService, private planeacionQuery: PlaneacionQuery)
    {
    }

    ngAfterViewInit(): void
    {
        this.sub.add(this.planeacionQuery.selectActive().subscribe(res => this.planeacion = res))
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
        this.planeacion = this.planeacionQuery.filPlaneacionDinamica(ValoresCamposMod.mirCuestionario, ValoresCamposMod.centroGestor, centroGestor);
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
