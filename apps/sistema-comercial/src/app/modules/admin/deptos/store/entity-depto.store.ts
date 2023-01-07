import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {Selector, State} from '@ngxs/store';
import {createEntityCollections, EntityCollections} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {ActualizarDeptoGQL, ActualizarDeptoMutation, CrearDeptoGQL, CrearDeptoMutation, DepartamentosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {BehaviorSubject, catchError, distinct, Observable, of, skipLast, take, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';

export interface ICargaDepto
{
    cargando: boolean;
}

@StateRepository()
@State({
    name: 'deptos',
    defaults: {
        ...createEntityCollections(),
        cargando: false
    }
})
@Injectable()
export class EntityDeptoStore extends NgxsDataEntityCollectionsRepository<IDepto, string, ICargaDepto>
{
    public override primaryKey = '_id';
    public estaCargando = new BehaviorSubject(false);
    #loaderId = 'listaDeptos';

    constructor(private departamentosGQL: DepartamentosGQL, private ngxLoader: NgxUiLoaderService, private crearDeptoGQL: CrearDeptoGQL,
                private actualizarDeptoGQL: ActualizarDeptoGQL)
    {
        super();
    }

    // @Selector()
    // public static estaCargando(estaCargando: EntityCollections<IDepto, string, ICargaDepto>): boolean
    // {
    //     return estaCargando.cargando;
    // }

    // get getCargarDatos(): Observable<boolean>
    // {
    //     return this.#cargando.asObservable();
    // }
    //
    // set setCargarDatos(v: boolean)
    // {
    //     this.#cargando.next(v);
    // }

    @DataAction()
    public cargarDeptos(): void
    {
        this.ngxLoader.startLoader(this.#loaderId);
        this.departamentosGQL.watch().valueChanges.subscribe((res) =>
        {
            if (isNotNil(res.data))
            {
                this.ngxLoader.stopLoader(this.#loaderId);
                const deptos = $cast<IDepto[]>(res.data.deptos);
                this.setAll(deptos);
            }
        });
    }

    @DataAction()
    public actualizarDepto(@Payload('actualizar') depto: IDepto): Observable<SingleExecutionResult<ActualizarDeptoMutation>>
    {
        // this.patchState({cargando: true});
        this.estaCargando.next(true);
        return this.actualizarDeptoGQL.mutate({input: depto}).pipe(tap((res) =>
        {
            const act = $cast<IDepto>(res.data.actualizarDepto);
            this.updateOne({id: act._id, changes: act});
            this.estaCargando.next(false);
            // this.patchState({cargando: false});
        }));
    }

    @DataAction()
    agregarDepto(@Payload('Agregar') depto: IDepto): Observable<SingleExecutionResult<CrearDeptoMutation>>
    {
        return this.crearDeptoGQL.mutate({input: depto}).pipe(tap((res) =>
        {
            const agregar = $cast<IDepto>(res.data.crearDepto);
            this.addOne(agregar);
        }), catchError(() => of(null)));
    }
}
