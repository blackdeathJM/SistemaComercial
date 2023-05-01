import {Injectable} from '@angular/core';
import {IPlaneacionState, PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {QueryEntity} from '@datorama/akita';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';

@Injectable({providedIn: 'root'})
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    constructor(protected planeacionStore: PlaneacionStore)
    {
        super(planeacionStore);
    }

    public filPlaneacionCentroGestorEmpleado(cuestionario: string, filtro: string, valorFiltrar: string): IPlaneacion
    {
        const entidad = this.getActive();
        // const mirCuestionarioOriginal = [...entidad.mirCuestionario];
        const mirCuestionarioOriginal = entidad[cuestionario].slice();

        return {
            ...entidad,
            [cuestionario]: mirCuestionarioOriginal.filter(value => value[filtro] === valorFiltrar)
        };
    }
}
