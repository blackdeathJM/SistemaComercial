import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccionesMirPbrComponent} from "@s-dir-general/acciones-mir-pbr/acciones-mir-pbr.component";
import {IPlaneacion} from "#/libs/models/src/lib/dir-general/planeacion/planeacion.interface";
import {PlaneacionQuery} from "@s-dir-general/store/planeacion.query";
import {PlaneacionStore} from "@s-dir-general/store/planeacion.store";

@Component({
    selector: 'app-componentes',
    standalone: true,
    imports: [CommonModule, AccionesMirPbrComponent],
    templateUrl: './componentes.component.html',
    styleUrls: ['./componentes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentesComponent
{
    constructor(private planea: PlaneacionQuery, private planeacionStore: PlaneacionStore)
    {
    }

    planeacionSeleccionado(e: IPlaneacion): void
    {
        this.planeacionStore.setActive(e._id);
    }

    centroGestor(e: string): void
    {
        // vamos a filtrar el arreglo de mir y el arreglo del pbr para empezar a crear los componentes individuales que pueden tener información de los dos arreglos

    }
}
