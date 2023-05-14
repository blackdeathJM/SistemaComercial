import {computed, Injectable, Signal, signal} from '@angular/core';
import {IPlaneacionState, PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {QueryEntity} from '@datorama/akita';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {IPbrCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {usuarioFil} from "@s-dir-general/store/planeacion.service";
import {isNotNil} from "@angular-ru/cdk/utils";

@Injectable({providedIn: 'root'})
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    public cuestionarioPbr = signal<IPbrCuestionario>(null);
    public cuestionarioPbrV = signal<IPbrCuestionario[]>([]);
    public cuestionarioMir = signal<IMirCuestionario>(null);
    public cuestionarioMirV = signal<IMirCuestionario[]>([]);
    public centroGestor = signal<string>(null);

    public compCuestionariopbr: Signal<IPbrCuestionario[]> = computed(() =>
    {
        const cuestionarioOriginal = this.cuestionarioPbrV().slice();
        if (isNotNil(usuarioFil()))
        {
            return cuestionarioOriginal.filter(value => value.idEmpleado === usuarioFil())
        }
        if (isNotNil(this.centroGestor()))
        {
            return cuestionarioOriginal.filter(value => value.centroGestor === this.centroGestor());
        }
        return this.cuestionarioPbrV();
    });

    public compCuestionarioMir: Signal<IMirCuestionario[]> = computed(() =>
    {
        const cuestionarioOriginal = this.cuestionarioMirV().slice();
        if (this.centroGestor())
        {
            return cuestionarioOriginal.filter(value => value.centroGestor === this.centroGestor());
        }
        return this.cuestionarioMirV();
    });

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
