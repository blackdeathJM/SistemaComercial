import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {Injectable} from '@angular/core';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {finalize, map, Observable, tap} from 'rxjs';
import {DepartamentosGQL} from '#/libs/datos/src';
import {Immutable} from '@angular-ru/cdk/typings';

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
    public cargarDeptos(): Observable<IDepto[]>
    {
        this.ctx.patchState({cargando: true});
        return this.departamentosGQL.watch().valueChanges.pipe(
            tap((res) =>
            {
                this.ctx.patchState({deptos: res.data.deptos as IDepto[]});
            }), map(deptos => deptos.data.deptos as IDepto[]),
            finalize(() => this.ctx.patchState({cargando: false})));
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
