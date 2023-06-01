import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
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

@Component({
    selector: 'app-mod-componentes',
    standalone: true,
    imports: [CommonModule, MatButtonToggleModule, ModCompComun, MatFormFieldModule, MatOptionModule, MatSelectModule, MatListModule, MatTabsModule, MatToolbarModule],
    templateUrl: './mod-componentes.component.html',
    styleUrls: ['./mod-componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModComponentesComponent
{
    indice: number = 0;

    constructor(public planeacionQuery: PlaneacionQuery, public seleccionQuery: SeleccionQuery)
    {
    }

    filCentroGestor(e: string): void
    {
        console.log('selecciona centro gestor', e);
        this.planeacionQuery.centroGestor.set(e);
    }

    pbrSeleccionado(e: IPbrCuestionario): void
    {
        console.log('PbrSeleccionado', e);
        this.planeacionQuery.cuestionarioPbr.set(e);
    }

    sumatoriaSeleccionada(e: ISumatorias): void
    {
        console.log('Sumatoria seleccionada', e);
        this.planeacionQuery.sumatoriaPbr.set(e);
    }

    cambioIndice(e: number): void
    {
        this.indice = e;
    }
}
