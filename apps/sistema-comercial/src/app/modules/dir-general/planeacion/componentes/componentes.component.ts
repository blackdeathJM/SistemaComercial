import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from "@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {PlaneacionStore} from "@s-dir-general/store/planeacion.store";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatListModule} from "@angular/material/list";
import {DateTime} from "luxon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ModComponentesComponent} from "@s-dir-general/componentes/mod-componentes/mod-componentes.component";
import {TRegComp} from "@s-dir-general/store/planeacion.interface";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent
{
    // mirCuestionario: IMirCuestionario[] = [];
    // pbrCuestionario: IPbrCuestionario[] = [];
    @Input({required: true}) set mirCuestionario(v: IMirCuestionario)
    {
        this._mirCuestionario = v;
    }

    _mirCuestionario: IMirCuestionario = null;
    fecha = DateTime.local().toLocaleString(DateTime.DATE_SHORT);

    constructor(private planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore, private mdr: MatDialog)
    {
    }

    // centroGestor(e: string): void
    // {
    //     // vamos a filtrar el arreglo de mir y el arreglo del pbr para empezar a crear los componentes individuales que pueden tener información de los dos arreglos
    //     this.mirCuestionario = this.planeacionQuery.filPlaneacionDinamica(ValoresCamposMod.mirCuestionario, ValoresCamposMod.centroGestor, e).mirCuestionario;
    //     this.pbrCuestionario = this.planeacionQuery.filPlaneacionDinamica(ValoresCamposMod.pbrCuestionario, ValoresCamposMod.centroGestor, e).pbrCuestionario;
    // }
    regComponente(): void
    {
        const data: TRegComp =
            {
                _id: this.planeacionQuery.getActive()._id,
                idIndicador: this._mirCuestionario.idIndicador,
                centroGestor: this._mirCuestionario.centroGestor
            };
        this.mdr.open(ModComponentesComponent, {width: '50%', data});
    }
}
