import {computed, Injectable, Signal, signal} from '@angular/core';
import {IPlaneacionState, PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {QueryEntity} from '@datorama/akita';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {Observable} from "rxjs";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";

@Injectable({providedIn: 'root'})
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    public cuestionarioPbr = signal<IPbrCuestionario>(null);
    public cuestionarioMir = signal<IMirCuestionario>(null);


    constructor(protected planeacionStore: PlaneacionStore)
    {
        super(planeacionStore);
    }

    public filPlaneacionDinamica(cuestionario: string, filtro: string, valorFiltrar: string): IPlaneacion
    {
        const entidad = this.getActive();
        const cuestionarioOriginal = entidad[cuestionario].slice();

        return {
            ...entidad,
            [cuestionario]: cuestionarioOriginal.filter(value => value[filtro] === valorFiltrar)
        };
    }
}
