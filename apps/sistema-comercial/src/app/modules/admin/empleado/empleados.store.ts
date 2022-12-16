import {Computed, DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {catchError, finalize, map, Observable, of, tap} from 'rxjs';
import {CrearEmpleadoGQL, CrearEmpleadoMutation, EmpleadosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {IResolveEmpleado, TRegEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {StateEmpleado} from '@s-admin/empleado.store';
import {MutationResult} from 'apollo-angular';
import {Immutable} from '@angular-ru/cdk/typings';

interface IStoreEmpleado
{
    empleados: IResolveEmpleado[];
    cargando: boolean;
}

@StateRepository()
@State<IStoreEmpleado>({
    name: 'empleados',
    defaults: {empleados: [], cargando: false},
    children: [StateEmpleado]
})
@Injectable()
export class StateEmpleados extends NgxsImmutableDataRepository<IStoreEmpleado>
{
    constructor(private empleadosGql: EmpleadosGQL, private ngxToastService: NgxToastService, private crearEmpleadoGql: CrearEmpleadoGQL, private ngxToast: NgxToastService)
    {
        super();
    }

    @Computed()
    public get cargando(): boolean
    {
        return this.snapshot.cargando;
    }

    @Computed()
    public get longEmpleados(): boolean
    {
        return this.snapshot.empleados.length === 0;
    }

    @Selector()
    public static empleados(state: IStoreEmpleado): IResolveEmpleado[]
    {
        return state.empleados;
    }

    @DataAction({subscribeRequired: false})
    public cargarEmpleados(): void
    {
        this.ctx.patchState({cargando: true});
        this.empleadosGql.watch().valueChanges.pipe(map((res) =>
        {
            const empleados: IResolveEmpleado[] = $cast<IResolveEmpleado[]>(res.data.empleados);
            if (isNotNil(res.data))
            {
                this.ctx.setState({cargando: res.loading, empleados});
            }
        }), catchError((err) =>
        {
            console.log('obtener empleados', err);
            this.ngxToastService.errorToast('Error al obtener los empleados', 'empleados');
            return of([]);
        }), finalize(() => console.log('si finaliza carga de empleados'))).subscribe();
    }

    @DataAction({subscribeRequired: false})
    public filtrarEmpleado(@Payload('empleadoFiltrado') arg: string): void
    {
        // this.ctx.setState((state: Immutable<IResolveEmpleado[]>): Immutable<IResolveEmpleado[]> => (state.filter()));
    }

    @DataAction({subscribeRequired: true})
    public crearEmpleado(@Payload('crearEmpleado') empleadoDatos: TRegEmpleado): Observable<MutationResult<CrearEmpleadoMutation>>
    {
        return this.crearEmpleadoGql.mutate({empleadoDatos}).pipe(tap((res) =>
        {
            this.ctx.patchState({cargando: res.loading});
            if (isNotNil(res.data))
            {
                const nvoEmpleado: IResolveEmpleado = $cast<IResolveEmpleado>(res.data.crearEmpleado);
                this.ctx.setState((state: Immutable<IStoreEmpleado>): Immutable<IStoreEmpleado> => ({empleados: state.empleados.concat(nvoEmpleado), cargando: res.loading}));
            }
        }), catchError((err) =>
        {
            this.ngxToast.errorToast('Ocurrio un error al tratar al registrar el empleado', 'Error en registro');
            console.log('error empleados', err);
            return of(null);
        }));
    }
}

