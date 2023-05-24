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
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {TiposFormulario} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.interface";
import {MatTabsModule} from "@angular/material/tabs";

@Component({
    selector: 'app-mod-componentes',
    standalone: true,
    imports: [CommonModule, MatButtonToggleModule, ModCompComun, MatFormFieldModule, MatOptionModule, MatSelectModule, MatListModule, MatTabsModule],
    templateUrl: './mod-componentes.component.html',
    styleUrls: ['./mod-componentes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModComponentesComponent
{
    cuestionarioPbr: IPbrCuestionario = null;
    indice: number = 0;

    constructor(public planeacionQuery: PlaneacionQuery, public seleccionQuery: SeleccionQuery)
    {
    }

    filCentroGestor(e: string): void
    {
        this.planeacionQuery.centroGestor.set(e);
    }

    elementoSeleccionado(e: IPbrCuestionario): void
    {
        this.cuestionarioPbr = e;
    }

    protected readonly TiposFormulario = TiposFormulario;

    cambioIndice(e: number): void
    {
        this.indice = e;
    }
}
