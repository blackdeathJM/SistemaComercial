import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {State} from '@ngxs/store';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {Injectable} from '@angular/core';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {ActualizarDeptoGQL, CrearDeptoGQL, DepartamentosGQL} from '#/libs/datos/src';
import {$cast} from '@angular-ru/cdk/utils';

export interface IDeptoSelect
{
    depto: IDepto;
}

@StateRepository()
@State({
    name: 'deptos',
    defaults: {
        ...createEntityCollections(),
        depto: null
    }
})
@Injectable()
export class EntityDeptoStore extends NgxsDataEntityCollectionsRepository<IDepto, string, IDeptoSelect>
{
    public override primaryKey = '_id';
    constructor(private crearDeptoGQL: CrearDeptoGQL, private departamentosGQL: DepartamentosGQL, private actualizarDeptoGQL: ActualizarDeptoGQL)
    {
        super();
    }

    @DataAction()
    departamentos(): void
    {
        this.departamentosGQL.watch().valueChanges.subscribe((res) =>
        {
            const deptos = $cast<IDepto[]>(res.data.deptos);
            this.setAll(deptos);
        });
    }

    @DataAction()
    crearDepto(depto: IDepto): void
    {
        this.crearDeptoGQL.mutate({input: depto}).subscribe((res) =>
        {
            const departamento = $cast<IDepto>(res.data.crearDepto);
            this.setOne(departamento);
        });
    }

    @DataAction()
    actualizarDepto(input: IDepto): void
    {
        this.actualizarDeptoGQL.mutate({input}).subscribe((res) =>
        {
            const deptoActualizado = $cast<IDepto>(res.data.actualizarDepto);
            this.updateOne({id: deptoActualizado._id, changes: deptoActualizado});
        });
    }
}
