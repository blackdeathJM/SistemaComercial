import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ModCompComun} from "@s-dir-general/componentes/mod-componentes/mod-comp-comun/mod-comp-comun";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {SeleccionQuery} from "@s-dir-general/selecciones/store/seleccion.query";
import {MatListModule} from "@angular/material/list";
import {IPbrCuestionario, ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {fuseAnimations} from "@s-fuse/public-api";
import {ActivatedRoute} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Subscription} from "rxjs";
import {isNil} from "@angular-ru/cdk/utils";

@Component({
    selector: 'app-mod-componentes',
    standalone: true,
    imports: [CommonModule, MatButtonToggleModule, ModCompComun, MatFormFieldModule, MatOptionModule, MatSelectModule, MatListModule, MatTabsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
    templateUrl: './mod-componentes.component.html',
    styleUrls: ['./mod-componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModComponentesComponent implements OnInit, OnDestroy
{
    indice: number = 0;
    esPbrPrincipal = true;
    sub = new Subscription();

    constructor(public planeacionQuery: PlaneacionQuery, public seleccionQuery: SeleccionQuery, private activatedRoute: ActivatedRoute, private location: Location)
    {
    }

    ngOnInit(): void
    {
        if (isNil(this.planeacionQuery.getActive()))
        {
            this.location.back();
        }
    }

    filCentroGestor(e: string): void
    {
        this.planeacionQuery.centroGestor.set(e);
    }

    pbrSeleccionado(e: IPbrCuestionario): void
    {
        this.planeacionQuery.cuestionarioPbr.set(e);
    }

    sumatoriaSeleccionada(e: ISumatorias): void
    {
        this.planeacionQuery.sumatoriaPbr.set(e);
    }

    cambioIndice(e: number): void
    {
        this.indice = e;
    }

    seleccionarPbr(b: boolean): void
    {
        this.planeacionQuery.asignarValorPrincipal(b);
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }
}
