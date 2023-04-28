import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from 'rxjs';
import {
    EliminarElementoGQL,
    EliminarElementoMutation,
    FilCentroGestorGQL, FilCentroGestorQuery,
    FilTodosGQL,
    FilTodosQuery,
    InicializarPlaneacionGQL,
    InicializarPlaneacionMutation,
    RegMirGQL,
    RegMirMutation, RegPbrGQL, RegPbrMutation
} from '#/libs/datos/src';
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {makeVar, SingleExecutionResult} from '@apollo/client';
import {TEliminarElemento, TFilCentroGestor, TPlaneacionType} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {GeneralService} from '@s-services/general.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {TRegMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {isNotNil} from '@angular-ru/cdk/utils';
import {TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';

export const ngxLoaderMir = makeVar<string>('ngxLoaderMir');
export const ngxLoaderPbr = makeVar<string>('ngxLoaderPbr');
export const idPlaneacion = makeVar<string>(null);
export const actualizarMir = makeVar<[boolean, number]>([false, 0]);
export const actualizarPbr = makeVar<[boolean, number]>([false, 0]);

@Injectable({providedIn: 'root'})
export class PlaneacionService
{
    constructor(private filTodosGQL: FilTodosGQL, private inicializarPlaneacionGQL: InicializarPlaneacionGQL, private planeacionStore: PlaneacionStore, private ngxToast: NgxToastService,
                private generalService: GeneralService, private ngxLoader: NgxUiLoaderService, private regMirGQL: RegMirGQL, private filCentroGestorGQL: FilCentroGestorGQL,
                private eliminarElementoGQL: EliminarElementoGQL, private regPbrGQL: RegPbrGQL)
    {
    }

    filTodos(): Observable<SingleExecutionResult<FilTodosQuery>>
    {
        return this.filTodosGQL.fetch().pipe(catchError((err) => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const planeacion = res.data.filTodos as IPlaneacion[];
                this.planeacionStore.set(planeacion);
            }
        }));
    }

    filPorAno(_id: string): void
    {
        idPlaneacion(_id);
        this.planeacionStore.setActive(_id);
    }

    // filEmpleado(_id: string, idEmpleado: string): Observable<SingleExecutionResult>
    // {
    //
    // }

    filCentroGestor(args: TFilCentroGestor): Observable<SingleExecutionResult<FilCentroGestorQuery>>
    {
        return this.filCentroGestorGQL.fetch({...args}).pipe(catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (res && res.data)
                {
                    const {_id, ...datos} = res.data.filCentroGestor as IPlaneacion;
                    this.planeacionStore.update(_id, datos);
                }
            }));
    }

    inicializarPlaneacion(input: TPlaneacionType): Observable<SingleExecutionResult<InicializarPlaneacionMutation>>
    {
        return this.inicializarPlaneacionGQL.mutate({input}).pipe(catchError((err) => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const planeacionInicializado = res.data.inicializarPlaneacion as IPlaneacion;

                this.planeacionStore.add(planeacionInicializado);
                this.ngxToast.satisfactorioToast('Se ha inicializado un nuevo elemento MIR', 'Nva inicializacion MIR');
            }
        }));
    }

    regMir(datos: TRegMir): Observable<SingleExecutionResult<RegMirMutation>>
    {
        return this.regMirGQL.mutate({datos}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const {_id, ...cambio} = res.data.regMir as IPlaneacion;
                this.planeacionStore.update(_id, cambio);
                this.ngxToast.satisfactorioToast('El guardado ha sido exitoso', 'MIR');
            }
        }));
    }

    eliminarElemento(args: TEliminarElemento): Observable<SingleExecutionResult<EliminarElementoMutation>>
    {
        return this.eliminarElementoGQL.mutate({...args}).pipe(catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (res && res.data)
                {
                    const {_id, ...cambios} = res.data.eliminarElemento as IPlaneacion;
                    this.planeacionStore.update(_id, cambios);
                    this.ngxToast.satisfactorioToast('Un elemento se ha removido con exito', 'Remover MIR');
                }
            }));
    }

    regPbr(datos: TRegPbr): Observable<SingleExecutionResult<RegPbrMutation>>
    {
        return this.regPbrGQL.mutate({datos}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambios} = res.data.regPbr as IPlaneacion;
                this.planeacionStore.update(_id, cambios);
                this.ngxToast.satisfactorioToast('El elemento fue guardado con exito', 'PBR');
            }
        }));
    }
}
