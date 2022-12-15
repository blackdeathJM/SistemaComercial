import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {catchError, map, Observable, of} from 'rxjs';
import {EmpleadosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {IResolveEmpleado} from '#/libs/models/src/lib/admin/empleado/empleado.interface';
import {Injectable} from '@angular/core';

interface IEmpleadoStore
{
    empleados: IResolveEmpleado[];
    cargando: boolean;
}


// @StateRepository()
// @State({
//     name: 'empleado',
//     defaults: null,
// })
// @Injectable()
// export class StateEmpleado extends NgxsImmutableDataRepository<IResolveEmpleado>
// {
//     constructor()
//     {
//         super();
//     }
// }

@StateRepository()
@State<IEmpleadoStore>({
    name: 'empleados',
    defaults: {cargando: false, empleados: []}
})
@Injectable()
export class StateEmpleados extends NgxsImmutableDataRepository<IEmpleadoStore>
{
    constructor(private empleadosGql: EmpleadosGQL, private ngxToastService: NgxToastService)
    {
        super();
    }

    @Selector()
    public static empleados(state: IResolveEmpleado[]): IResolveEmpleado[]
    {
        return state;
    }

    @Selector()
    public static estaCargando(state: boolean): boolean
    {
        return state;
    }

    @DataAction()
    public cargarEmpleados(): Observable<IResolveEmpleado[]>
    {
        this.ctx.patchState({cargando: true});
        return this.empleadosGql.watch().valueChanges.pipe(map((res) =>
        {
            const empleados: IResolveEmpleado[] = $cast<IResolveEmpleado[]>(res.data.empleados);
            if (isNotNil(res.data))
            {
                this.ctx.patchState({cargando: res.loading, empleados});
                return empleados;
            } else
            {
                return [];
            }
        }), catchError((err) =>
        {
            console.log('obtener empleados', err);
            this.ngxToastService.errorToast('Error al obtener los empleados', 'empleados');
            return of([]);
        }));
    }
}

