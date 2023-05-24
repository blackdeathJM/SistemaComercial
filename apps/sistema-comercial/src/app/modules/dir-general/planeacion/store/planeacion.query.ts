import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {IPlaneacionState, PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {QueryEntity} from '@datorama/akita';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {IPbrCuestionario, ISumatorias} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.interface";
import {IMirCuestionario} from "#/libs/models/src/lib/dir-general/planeacion/mir/mir.interface";
import {usuarioFil} from "@s-dir-general/store/planeacion.service";
import {isNil, isNotNil} from "@angular-ru/cdk/utils";
import {NgxToastService} from "@s-services/ngx-toast.service";

@Injectable({providedIn: 'root'})
export class PlaneacionQuery extends QueryEntity<IPlaneacionState, IPlaneacion>
{
    public cuestionarioPbr: WritableSignal<IPbrCuestionario> = signal<IPbrCuestionario>(null);
    public cuestionarioPbrV = signal<IPbrCuestionario[]>([]);
    public cuestionarioMir = signal<IMirCuestionario>(null);
    public cuestionarioMirV = signal<IMirCuestionario[]>([]);
    public sumatoriaPbrV = signal<ISumatorias[]>([]);
    public centroGestor = signal<string>(null);

    public compCuestionarioPbr: Signal<IPbrCuestionario[]> = computed((): IPbrCuestionario[] =>
    {
        const cuestionarioOriginal: IPbrCuestionario[] = this.cuestionarioPbrV().slice();
        if (isNotNil(usuarioFil()))
        {
            return cuestionarioOriginal.filter(value => value.idEmpleado === usuarioFil())
        }
        if (this.centroGestor())
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

    public compSumatoriasPbr: Signal<ISumatorias[]> = computed(() =>
    {
        const cuestionarioOriginal = this.sumatoriaPbrV().slice();
        if (this.centroGestor())
        {
            return cuestionarioOriginal.filter(value => value.centroGestor === this.centroGestor());
        }
        return [];
    });

    constructor(protected planeacionStore: PlaneacionStore, private ngxToast: NgxToastService)
    {
        super(planeacionStore);
    }

    // Filtrar planeacion por año para enctrar el CuestionarioPbr que el usuario está registrando y traer el año anterior
    public filPorAno(anoActual: number, idIndicador: string): IPbrCuestionario
    {
        const planeacion = this.getAll().slice();
        const filtrarElAno = planeacion.find(value => value.ano === (anoActual - 1));
        if (isNil(filtrarElAno))
        {
            this.ngxToast.alertaToast('No se encontraron valores de un año anterior, puedes establecer valores manualmente', 'PBR');
            return null;
        }
        return filtrarElAno.pbrCuestionario.find(value => value.idIndicador === idIndicador);
    }
}
