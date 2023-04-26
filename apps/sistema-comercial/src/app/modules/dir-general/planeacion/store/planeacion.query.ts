import { Injectable } from '@angular/core';
import { IPlaneacionState, PlaneacionStore } from '@s-dir-general/store/planeacion.store';
import { QueryEntity } from '@datorama/akita';
import { IPlaneacion } from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';

@Injectable({ providedIn: 'root' })
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    constructor(protected planeacionStore: PlaneacionStore)
    {
        super(planeacionStore);
    }

    filCentroGestor(centroGestor: string): void
    {
        const activo = this.getActive().mirCuestionario.filter(value => value.centroGestor === centroGestor);

    }
}
