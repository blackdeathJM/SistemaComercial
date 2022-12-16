import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {DepartamentosGQL} from '#/libs/datos/src';
import {Immutable} from '@angular-ru/cdk/typings';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';

interface IDeptoState
{
    deptos: IDepto[];
    cargando: boolean;
}

@StateRepository()
@State<IDeptoState>({
    name: 'depto',
    defaults: {deptos: [], cargando: false}
})
@Injectable()
export class DeptoStore extends NgxsImmutableDataRepository<IDeptoState>
{
    constructor(private departamentosGQL: DepartamentosGQL)
    {
        super();
    }

    @Selector()
    public static deptos(state: IDeptoState): IDepto[]
    {
        return state.deptos;
    }

    @Selector()
    public static estaCargando(state: IDeptoState): boolean
    {
        return state.cargando;
    }

    @DataAction({subscribeRequired: false})
    public cargarDeptos(): void
    {
        this.ctx.patchState({cargando: true});
        this.departamentosGQL.watch().valueChanges.subscribe((res) =>
        {
            if (isNotNil(res.data))
            {
                this.ctx.setState({cargando: res.loading, deptos: $cast<IDepto[]>(res.data.deptos)});
            }
        });
    }

    @DataAction({subscribeRequired: false})
    public agregarDepto(@Payload('agregarDepto') input: IDepto, cargando: boolean): void
    {
        this.ctx.patchState({cargando: true});
        this.ctx.setState((state: Immutable<IDeptoState>): Immutable<IDeptoState> => ({deptos: state.deptos.concat(input), cargando}));
    }

    @DataAction({subscribeRequired: false})
    public actualizarDepto(@Payload('actualizarDepto') input: IDepto, cargando: boolean): void
    {
        this.ctx.patchState({cargando: true});
        this.ctx.setState((state: Immutable<IDeptoState>): Immutable<IDeptoState> => ({deptos: state.deptos.filter(value => value._id !== input._id), cargando}));
    }
}
