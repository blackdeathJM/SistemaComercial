import {Injectable} from '@angular/core';
import {IPlaneacionState, PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {QueryEntity} from '@datorama/akita';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";

@Injectable({providedIn: 'root'})
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    constructor(protected planeacionStore: PlaneacionStore)
    {
        super(planeacionStore);
    }

    public filPlaneacionDinamica(cuestionario: string, filtro: string, valorFiltrar: string): IPlaneacion
    {
        const entidad = this.getActive();
        // const cuestionario = [...entidad.mirCuestionario];
        const cuestionarioOriginal = entidad[cuestionario].slice();

        return {
            ...entidad,
            [cuestionario]: cuestionarioOriginal.filter(value => value[filtro] === valorFiltrar)
        };
    }
}
