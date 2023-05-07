import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from "@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {PlaneacionStore} from "@s-dir-general/store/planeacion.store";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {ValoresCamposMod} from "@s-dir-general/store/planeacion.service";
import {fuseAnimations} from "@s-fuse/public-api";
import {MatListModule} from "@angular/material/list";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent, MatListModule],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent
{
    mirCuestionario: IMirCuestionario[] = [];
    pbrCuestionario: IPbrCuestionario[] = [];
    fecha = new Date().getUTCDate();

    constructor(private planeacionQuery: PlaneacionQuery, private planeacionStore: PlaneacionStore)
    {
    }

    planeacionSeleccionado(e: IPlaneacion): void
    {
        this.planeacionStore.setActive(e._id);
    }

    centroGestor(e: string): void
    {
        // vamos a filtrar el arreglo de mir y el arreglo del pbr para empezar a crear los componentes individuales que pueden tener información de los dos arreglos
        this.mirCuestionario = this.planeacionQuery.filPlaneacionDinamica(ValoresCamposMod.mirCuestionario, ValoresCamposMod.centroGestor, e).mirCuestionario;
        this.pbrCuestionario = this.planeacionQuery.filPlaneacionDinamica(ValoresCamposMod.pbrCuestionario, ValoresCamposMod.centroGestor, e).pbrCuestionario;
    }

    cueChange(e: Event): void
    {
        console.log('------', e)
    }
}
