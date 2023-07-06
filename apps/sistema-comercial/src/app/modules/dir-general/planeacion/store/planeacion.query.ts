import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {IPlaneacionState, PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {QueryEntity} from '@datorama/akita';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {IPbrCuestionario, ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {usuarioFil} from "@s-dir-general/store/planeacion.service";
import {isNil} from "@angular-ru/cdk/utils";
import {NgxToastService} from "@s-services/ngx-toast.service";
import {AuthQuery} from "@s-core/auth/store/auth.query";

@Injectable({providedIn: 'root'})
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    cuestionarioPbr: WritableSignal<IPbrCuestionario> = signal<IPbrCuestionario>(null);
    cuestionarioPbrV: WritableSignal<IPbrCuestionario[]> = signal<IPbrCuestionario[]>([]);

    cuestionarioMir: WritableSignal<IMirCuestionario> = signal<IMirCuestionario>(null);
    cuestionarioMirV: WritableSignal<IMirCuestionario[]> = signal<IMirCuestionario[]>([]);

    sumatoriaPbrV: WritableSignal<ISumatorias[]> = signal<ISumatorias[]>([]);
    sumatoriaPbr: WritableSignal<ISumatorias> = signal<ISumatorias>(null);

    centroGestor: WritableSignal<string> = signal<string>('');

    compCuestionarioPbr: Signal<IPbrCuestionario[]> = computed((): IPbrCuestionario[] =>
    {
        const cuestionarioOriginal: IPbrCuestionario[] = this.cuestionarioPbrV().slice();
        if (usuarioFil())
        {
            return cuestionarioOriginal.filter(value => value.idEmpleado === this.authQuery.getValue()._id);
        }
        return cuestionarioOriginal.filter(value => value.centroGestor === this.centroGestor());
    });

    compCuestionarioMir: Signal<IMirCuestionario[]> = computed((): IMirCuestionario[] =>
    {
        const cuestionarioOriginal = this.cuestionarioMirV().slice();
        if (this.centroGestor())
        {
            return cuestionarioOriginal.filter(value => value.centroGestor === this.centroGestor());
        }
        return this.cuestionarioMirV();
    });

    compSumatoriasPbr: Signal<ISumatorias[]> = computed((): ISumatorias[] =>
    {
        const cuestionarioOriginal = this.sumatoriaPbrV().slice();
        if (this.centroGestor())
        {
            return cuestionarioOriginal.filter(value => value.centroGestor === this.centroGestor());
        }
        return [];
    });

    constructor(protected planeacionStore: PlaneacionStore, private ngxToast: NgxToastService, private authQuery: AuthQuery)
    {
        super(planeacionStore);
    }

    // Filtrar planeacion por año para enctrar el CuestionarioPbr que el usuario está registrando y traer el año anterior
    public filPeriodoAnt(anoActual: number, idIndicador: string, filSumatoria: boolean): IPbrCuestionario | ISumatorias
    {
        const planeacion = this.getAll().slice();
        const filtrarElAno = planeacion.find(value => value.ano === (anoActual - 1));

        if (isNil(filtrarElAno))
        {
            return null;
        }

        if (filSumatoria)
        {
            return filtrarElAno.pbrSumatoria.find(value => value.idSumatoria === idIndicador);
        } else
        {
            return filtrarElAno.pbrCuestionario.find(value => value.idIndicador === idIndicador);
        }
    }
}
