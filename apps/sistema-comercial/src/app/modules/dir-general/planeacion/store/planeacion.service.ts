import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from 'rxjs';
import {
    ActualizarResponsableGQL, EliminarElementoGQL,
    FilTodosGQL,
    FilTodosQuery,
    InicializarPlaneacionGQL,
    InicializarPlaneacionMutation, RegAvancePbrGQL, RegAvancePbrMutation,
    RegMirGQL,
    RegMirMutation, RegPbrGQL, RegPbrMutation, SumatoriaPbrGQL, SumatoriaPbrMutation
} from '#/libs/datos/src';
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {makeVar, SingleExecutionResult} from '@apollo/client';
import {TActualizarResponsable, TEliminarElemento, TPlaneacionType} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {GeneralService} from '@s-services/general.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {TRegMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {isNotNil} from '@angular-ru/cdk/utils';
import {TRegAvancesPbr, TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {FormGroup} from '@angular/forms';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {TSumPbr} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto";

export const ngxLoaderMir = makeVar<string>('ngxLoaderMir');
export const ngxLoaderPbr = makeVar<string>('ngxLoaderPbr');
export const actualizarMir = makeVar<[boolean, number]>([false, 0]);
export const actualizarPbr = makeVar<[boolean, number]>([false, 0]);
export const avancesPbr = makeVar<[string, number]>([null, null]);

export enum ValoresCamposMod
{
    centroGestor = 'centroGestor',
    idEmpleado = 'idEmpleado',
    mirCuestionario = 'mirCuestionario',
    pbrCuestionario = 'pbrCuestionario',
    pbrSumatoria = 'pbrSumatoria'
}

@Injectable({providedIn: 'root'})
export class PlaneacionService
{
    constructor(private filTodosGQL: FilTodosGQL, private inicializarPlaneacionGQL: InicializarPlaneacionGQL, private planeacionStore: PlaneacionStore, private ngxToast: NgxToastService,
                private generalService: GeneralService, private ngxLoader: NgxUiLoaderService, private regMirGQL: RegMirGQL, private eliminarElementoGQL: EliminarElementoGQL,
                private regPbrGQL: RegPbrGQL, private actualizarResponsableGQL: ActualizarResponsableGQL, private confirmacionService: ConfirmacionService,
                private planeacionQuery: PlaneacionQuery, private regAvancePbrGQL: RegAvancePbrGQL, private sumatoriaPbrGQL: SumatoriaPbrGQL)
    {
    }

    filTodos(): Observable<SingleExecutionResult<FilTodosQuery>>
    {
        return this.filTodosGQL.fetch().pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (res && res.data)
            {
                const planeacion = res.data.filTodos as IPlaneacion[];
                this.planeacionStore.set(planeacion);
            }
        }));
    }

    inicializarPlaneacion(input: TPlaneacionType): Observable<SingleExecutionResult<InicializarPlaneacionMutation>>
    {
        return this.inicializarPlaneacionGQL.mutate({input}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
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
                this.planeacionStore.update(_id, {...cambio});
                this.ngxToast.satisfactorioToast('El guardado ha sido exitoso', 'MIR');
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

    eliminarElemento(indiceArreglo: number, cuestionario: string): void
    {
        this.confirmacionService.abrir().afterClosed().subscribe((confirmacion) =>
        {
            if (confirmacion === 'confirmed')
            {
                const args: TEliminarElemento =
                    {
                        _id: this.planeacionQuery.getActive()._id,
                        idIndicador: this.planeacionQuery.getActive()[cuestionario][indiceArreglo].idIndicador,
                        cuestionario
                    };
                this.eliminarElementoGQL.mutate({...args}).pipe(catchError(err => this.generalService.cacharError(err)),
                    tap((res) =>
                    {
                        if (isNotNil(res) && isNotNil(res.data))
                        {
                            const {_id, ...cambios} = res.data.eliminarElemento as IPlaneacion;
                            this.planeacionStore.update(_id, cambios);
                            this.ngxToast.satisfactorioToast('Un elemento se ha removido con exito', 'Planeacion');
                        }
                    })).subscribe();
            }
        });
    }

    actualizarResponsable(form: FormGroup, idEmpleadoAnterior: string, cuestionario: string): void
    {
        if (form.get('idEmpleado').invalid)
        {
            this.ngxToast.alertaToast('Debes seleccionar un empleado a reemplazar', 'Responsable');
            return;
        }
        if (form.get('correo').invalid)
        {
            this.ngxToast.alertaToast('Debes tener un correo para el responsable', 'Responsable');
            return;
        }
        const message: string = 'Al realizar esta accion vas a cambiar el responsable para todo el centro gestor el cual tenga asignado';
        this.confirmacionService.abrir({message}).afterClosed().subscribe((conf) =>
        {
            if (conf === 'confirmed')
            {
                const args: TActualizarResponsable =
                    {
                        _id: this.planeacionQuery.getActive()._id,
                        idEmpleadoAnterior,
                        idEmpleado: form.get('idEmpleado').value,
                        correo: form.get('correo').value,
                        responsable: form.get('responsable').value,
                        cuestionario
                    };

                this.actualizarResponsableGQL.mutate({...args}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
                {
                    if (isNotNil(res) && isNotNil(res.data))
                    {
                        const {_id, ...cambios} = res.data.actualizarResponsable as IPlaneacion;
                        this.planeacionStore.update(_id, cambios);
                    }
                })).subscribe();
            }
        });
    }

    regAvancePbr(datos: TRegAvancesPbr): Observable<SingleExecutionResult<RegAvancePbrMutation>>
    {
        return this.regAvancePbrGQL.mutate({datos}).pipe(catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (isNotNil(res) && isNotNil(res.data))
                {
                    const {_id, ...cambios} = res.data.regAvancePbr as IPlaneacion;
                    this.planeacionStore.update(_id, {...cambios});
                    this.ngxToast.satisfactorioToast('El avance se ha registrado con exito', 'Registro de avances');
                }
            }));
    }

    sumatoriaPbr(datos: TSumPbr, actualizar: boolean): Observable<SingleExecutionResult<SumatoriaPbrMutation>>
    {
        return this.sumatoriaPbrGQL.mutate({datos, actualizar}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambios} = res.data.sumatoriaPbr as IPlaneacion;
                this.planeacionStore.update(_id, {...cambios});
                this.ngxToast.satisfactorioToast('La sumatoria se ha creado con exito', 'Sumatoria');
            }
        }));
    }
}
