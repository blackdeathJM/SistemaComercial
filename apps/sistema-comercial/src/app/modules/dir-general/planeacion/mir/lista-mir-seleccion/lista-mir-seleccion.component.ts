import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonToggleChange, MatButtonToggleModule} from "@angular/material/button-toggle";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {AuthQuery} from "@s-core/auth/store/auth.query";

@Component({
    selector: 'app-lista-mir-seleccion',
    standalone: true,
    imports: [CommonModule, MatExpansionModule, MatButtonToggleModule],
    templateUrl: './lista-mir-seleccion.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [],
})
export class ListaMirSeleccionComponent
{
    @Input({required: true}) set mirs(v: IMirCuestionario[])
    {
        this._mirs = v;
    }

    _mirs: IMirCuestionario[] = [];
    indice = 0;

    constructor(private planeacionQuery: PlaneacionQuery) {}

    trackByFn(index: number): number
    {
        return index;
    }

    cambioDeSeleccion(e: MatButtonToggleChange, i: number)
    {
        this.indice = i;
        const cuestionarioMir = e.value as IMirCuestionario;
        this.planeacionQuery.cuestionarioMir.set(cuestionarioMir);
    }
}
