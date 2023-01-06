import {Injectable} from '@angular/core';
import {DeptoStore} from '@s-admin/store/depto.store';
import {ActualizarDeptoGQL, CrearDeptoGQL, CrearDeptoMutation, DepartamentosGQL} from '#/libs/datos/src';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';

@Injectable({providedIn: 'root'})
export class DeptoService
{
    constructor(private deptoStore: DeptoStore, private departamentosGQL: DepartamentosGQL, private crearDeptoGQL: CrearDeptoGQL, private actualizarDeptoGQL: ActualizarDeptoGQL)
    {
    }

    departamentos(): void
    {
        this.departamentosGQL.watch({}).valueChanges.subscribe((res) =>
        {
            if (res.data)
            {
                const deptos = res.data.deptos as IDepto[];
                this.deptoStore.set(deptos);
            }
        });
    }

    // Observable<SingleExecutionResult<CrearDeptoMutation>>
    crearDepto(input: IDepto): void
    {
        this.crearDeptoGQL.mutate({input}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const depto = res.data.crearDepto as IDepto;
                this.deptoStore.add(depto);
            }
        })).subscribe();
    }

    actualizarDepto(input: IDepto): void
    {
        this.deptoStore.setLoading(true);
        this.actualizarDeptoGQL.mutate({input}).subscribe((res) =>
        {
            if (res.data)
            {
                this.deptoStore.update(input._id, {...input});
                this.deptoStore.setLoading(false);
            }
        });
    }
}
