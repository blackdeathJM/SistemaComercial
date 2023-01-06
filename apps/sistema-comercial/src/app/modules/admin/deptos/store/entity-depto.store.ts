import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {ActualizarDeptoGQL, ActualizarDeptoMutation, CrearDeptoGQL, CrearDeptoMutation, DepartamentosGQL} from '#/libs/datos/src';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable, Subscription, tap} from 'rxjs';
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
    #loaderId = 'listaDeptos';

    constructor(private departamentosGQL: DepartamentosGQL, private ngxLoader: NgxUiLoaderService, private crearDeptoGQL: CrearDeptoGQL,
                private actualizarDeptoGQL: ActualizarDeptoGQL)
    {
        super();
    }

    @DataAction()
    public cargarDeptos(): void
    {
        this.ngxLoader.startLoader(this.#loaderId);
        this.departamentosGQL.watch().valueChanges.subscribe((res) =>
        {
            if (isNotNil(res.data))
            {
                const deptos = $cast<IDepto[]>(res.data.deptos);
                this.setAll(deptos);
                this.ngxLoader.stopLoader(this.#loaderId);
            }
        });
    }

    @DataAction()
    public actualizarDepto(@Payload('actualizar') depto: IDepto): Observable<SingleExecutionResult<ActualizarDeptoMutation>>
    {
        return this.actualizarDeptoGQL.mutate({input: depto}).pipe(tap((res) =>
        {
            const act = $cast<IDepto>(res.data.actualizarDepto);
            this.updateOne({id: act._id, changes: act});
        }));
    }

    @DataAction()
    public agregarDepto(@Payload('Agregar') depto: IDepto): Observable<SingleExecutionResult<CrearDeptoMutation>>
    {
        return this.crearDeptoGQL.mutate({input: depto}).pipe(tap((res) =>
        {
            const agregar = $cast<IDepto>(res.data.crearDepto);
            this.addOne(agregar);
        }));
    }
}
