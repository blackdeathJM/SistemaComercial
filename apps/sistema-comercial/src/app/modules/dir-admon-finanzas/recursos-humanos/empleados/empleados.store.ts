import {Computed, DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {catchError, finalize, map, of} from 'rxjs';
import {CrearEmpleadoGQL, EmpleadosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';
import {Immutable} from '@angular-ru/cdk/typings';

interface IStoreEmpleado
{
    empleados: IResolveEmpleado[];
    cargando: boolean;
}

@StateRepository()
@State<IStoreEmpleado>({
    name: 'empleados',
    defaults: {empleados: [], cargando: false}
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
        // Obtener el estado de carga de las subscripciones para mostrar el loading a la hora de procesar la consulta graphql
        return this.snapshot.cargando;
    }

    @Computed()
    public get longEmpleados(): boolean
    {
        // Obtener la longitud del estado de empleados el cual es utilizado para mostrar la alerta si no hay datos en el estado
        return this.snapshot.empleados.length === 0;
    }

    @Selector()
    public static empleados(state: IStoreEmpleado): IResolveEmpleado[]
    {
        // Observable al que se subscriben las peticiones a la base de datos
        return state.empleados;
    }

    @DataAction({subscribeRequired: false})
    public empleados(): void
    {
        // Carga inicial de empleados en esta consulta se obtienen todos los empleados registrados
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
    public crearEmpleado(@Payload('crearEmpleado') empleadoDatos: IResolveEmpleado): void
    {
        this.ctx.setState((state: Immutable<IStoreEmpleado>): Immutable<IStoreEmpleado> => ({empleados: state.empleados.concat(empleadoDatos), cargando: false}));
    }

    @DataAction({subscribeRequired: false})
    asignarAuth(@Payload('AsignarAuth') sesionAsignada: IResolveEmpleado): void
    {
        this.actualizarEdo(sesionAsignada._id);
    }

    private actualizarEdo(_id: string): void
    {
        this.ctx.setState((state: Immutable<IStoreEmpleado>): Immutable<IStoreEmpleado> => ({empleados: state.empleados.filter(value => value._id !== _id), cargando: false}));
    }
}

