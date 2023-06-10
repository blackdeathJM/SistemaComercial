import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from 'rxjs';
import {
    ActualizarResponsableGQL,
    EliminarComponenteGQL,
    FilTodosGQL,
    FilTodosQuery,
    InicializarPlaneacionGQL,
    InicializarPlaneacionMutation,
    RecalcularPbrGQL,
    RecalcularPbrMutation,
    ReemplazarCompGQL,
    ReemplazarCompMutation,
    RegAvancePbrGQL,
    RegAvancePbrMutation,
    RegCompDinamicoGQL,
    RegCompDinamicoMutation,
    RegComponenteGQL,
    RegComponenteMutation,
    RegMirGQL,
    RegMirMutation,
    RegPbrGQL,
    RegPbrMutation,
    SumatoriaPbrGQL,
    SumatoriaPbrMutation
} from '#/libs/datos/src';
import {PlaneacionStore} from '@s-dir-general/store/planeacion.store';
import {makeVar, SingleExecutionResult} from '@apollo/client';
import {TActualizarResponsable, TEliminarElemento, TPlaneacionType, TReemplazarComp} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.dto';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {GeneralService} from '@s-services/general.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {TRegMir} from '#/libs/models/src/lib/dir-general/planeacion/mir/mir.dto';
import {IPlaneacion} from '#/libs/models/src/lib/dir-general/planeacion/planeacion.interface';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {TRecalcularPbr, TRegAvancesPbr, TRegPbr} from '#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbr.dto';
import {FormGroup} from '@angular/forms';
import {ConfirmacionService} from '@s-services/confirmacion.service';
import {PlaneacionQuery} from '@s-dir-general/store/planeacion.query';
import {TSumPbr} from "#/libs/models/src/lib/dir-general/planeacion/pbr-usuarios/pbrSumatoria.dto";
import {TRegComponente} from "#/libs/models/src/lib/dir-general/planeacion/componentes/componente.dto";

export const ngxLoaderMir = makeVar<string>('ngxLoaderMir');
export const ngxLoaderPbr = makeVar<string>('ngxLoaderPbr');
export const actCuestionario = makeVar<boolean>(false);
export const usuarioFil = makeVar<boolean>(false);

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
                private generalService: GeneralService, private ngxLoader: NgxUiLoaderService, private regMirGQL: RegMirGQL, private eliminarComponenteGQL: EliminarComponenteGQL,
                private regPbrGQL: RegPbrGQL, private actualizarResponsableGQL: ActualizarResponsableGQL, private confirmacionService: ConfirmacionService, private regComponenteGQL: RegComponenteGQL,
                private planeacionQuery: PlaneacionQuery, private regAvancePbrGQL: RegAvancePbrGQL, private sumatoriaPbrGQL: SumatoriaPbrGQL, private recalcularPbrGQL: RecalcularPbrGQL,
                private reemplazarCompGQL: ReemplazarCompGQL, private regCompDinamicoGQL: RegCompDinamicoGQL)
    {
    }

    filTodos(): Observable<SingleExecutionResult<FilTodosQuery>>
    {
        return this.filTodosGQL.fetch().pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const planeacion = $cast<IPlaneacion[]>(res.data.filTodos);
                this.planeacionStore.set(planeacion);
            }
        }));
    }

    inicializarPlaneacion(input: TPlaneacionType): Observable<SingleExecutionResult<InicializarPlaneacionMutation>>
    {
        return this.inicializarPlaneacionGQL.mutate({input}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const planeacionInicializado = res.data.inicializarPlaneacion;
                this.planeacionStore.add(planeacionInicializado);
                this.ngxToast.satisfactorioToast('Se ha inicializado un nuevo elemento MIR', 'Nva inicializacion MIR');
            }
        }));
    }

    regMir(datos: TRegMir): Observable<SingleExecutionResult<RegMirMutation>>
    {
        return this.regMirGQL.mutate({datos}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambio} = <IPlaneacion>res.data.regMir;
                this.planeacionStore.update(_id, cambio);
                this.planeacionStore.update(_id, {});
                this.planeacionQuery.cuestionarioMirV.set(cambio.mirCuestionario);
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
                this.planeacionQuery.cuestionarioPbrV.set(cambios.pbrCuestionario);
                this.ngxToast.satisfactorioToast('El elemento fue guardado con exito', 'PBR');
            }
        }));
    }

    eliminarElemento(idIndicador: string, cuestionario: string): void
    {
        this.confirmacionService.abrir().afterClosed().subscribe((confirmacion) =>
        {
            if (confirmacion === 'confirmed')
            {
                const args: TEliminarElemento =
                    {
                        _id: this.planeacionQuery.getActive()._id,
                        idIndicador: this.planeacionQuery.getActive()[cuestionario].find(va => va.idIndicador === idIndicador),
                        cuestionario
                    };
                this.eliminarComponenteGQL.mutate({...args}).pipe(catchError(err => this.generalService.cacharError(err)),
                    tap((res) =>
                    {
                        if (isNotNil(res) && isNotNil(res.data))
                        {
                            const {_id, ...cambios} = res.data.eliminarElemento as IPlaneacion;
                            this.planeacionStore.update(_id, cambios);
                            this.planeacionQuery.cuestionarioPbrV.set(cambios.pbrCuestionario);
                            this.planeacionQuery.cuestionarioMirV.set(cambios.mirCuestionario);
                            this.ngxToast.satisfactorioToast('Un elemento se ha removido con exito', 'Planeacion');
                        }
                    })).subscribe();
            }
        });
    }

    actualizarResponsable(form: FormGroup, idEmpleadoAnterior: string, cuestionario: string): Observable<any>
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
        return this.confirmacionService.abrir({message}).afterClosed().pipe(tap((config) =>
        {
            if (config === 'confirmed')
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
                        this.planeacionQuery.cuestionarioMirV.set(cambios.mirCuestionario);
                        this.planeacionQuery.cuestionarioPbrV.set(cambios.pbrCuestionario);
                        this.ngxToast.satisfactorioToast('El responsable fue actualizado con exito para todo el centro gestor', 'Cambio de responsable');
                    }
                })).subscribe();
            }
        }));
    }

    regAvancePbr(datos: TRegAvancesPbr): Observable<SingleExecutionResult<RegAvancePbrMutation>>
    {
        return this.regAvancePbrGQL.mutate({datos}).pipe(catchError(err => this.generalService.cacharError(err)),
            tap((res) =>
            {
                if (isNotNil(res) && isNotNil(res.data))
                {
                    const {_id, ...cambios} = res.data.regAvancePbr as IPlaneacion;
                    this.planeacionStore.update(_id, cambios);
                    this.planeacionQuery.cuestionarioPbrV.set(cambios.pbrCuestionario);
                    this.planeacionQuery.sumatoriaPbrV.set(cambios.pbrSumatoria);
                    this.ngxToast.satisfactorioToast('El avance se ha relizado con exito', 'Registro de avances');
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
                this.planeacionQuery.cuestionarioPbrV.set(cambios.pbrCuestionario);
                this.planeacionQuery.sumatoriaPbrV.set(cambios.pbrSumatoria);
                this.ngxToast.satisfactorioToast('La sumatoria se ha creado con exito', 'Sumatoria');
            }
        }));
    }

    recalcularPbr(args: TRecalcularPbr): Observable<SingleExecutionResult<RecalcularPbrMutation>>
    {
        return this.recalcularPbrGQL.mutate({args}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambios} = $cast<IPlaneacion>(res.data.recalcularPbr);
                this.planeacionStore.update(_id, cambios);
                this.planeacionQuery.cuestionarioPbrV.set(cambios.pbrCuestionario);
                this.planeacionQuery.sumatoriaPbrV.set(cambios.pbrSumatoria);

                this.ngxToast.satisfactorioToast('Se han recalculado todo correctamente', 'Recalcular multiples campos');
            }
        }));
    }

    regComponente(datos: TRegComponente): Observable<SingleExecutionResult<RegComponenteMutation>>
    {
        return this.regComponenteGQL.mutate({datos}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambios} = <IPlaneacion>res.data.regComponente;
                this.planeacionStore.update(_id, cambios);
                this.planeacionQuery.cuestionarioMirV.set(cambios.mirCuestionario);
                this.ngxToast.satisfactorioToast('Haz registrado un nuevo componente', 'Registro de componente');
            }
        }));
    }

    reemplazarComp(args: TReemplazarComp): Observable<SingleExecutionResult<ReemplazarCompMutation>>
    {
        return this.reemplazarCompGQL.mutate({...args}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambios} = <IPlaneacion>res.data.reemplazarComp;
                this.planeacionStore.update(_id, cambios);
                this.planeacionQuery.cuestionarioMirV.set(cambios.mirCuestionario);
            }
        }));
    }

    regCompDinamico(datos: TRegComponente): Observable<SingleExecutionResult<RegCompDinamicoMutation>>
    {
        return this.regCompDinamicoGQL.mutate({datos}).pipe(catchError(err => this.generalService.cacharError(err)), tap((res) =>
        {
            if (isNotNil(res) && isNotNil(res.data))
            {
                const {_id, ...cambios} = <IPlaneacion>res.data.regCompDinamico;
                this.planeacionStore.update(_id, cambios);
                this.planeacionQuery.cuestionarioMirV.set(cambios.mirCuestionario);
                this.ngxToast.satisfactorioToast('Se ha registrado un nuevo componente con exito', 'Registro Componentes');
            }
        }));
    }
}
