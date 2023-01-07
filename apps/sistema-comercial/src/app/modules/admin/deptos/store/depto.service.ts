import {Injectable} from '@angular/core';
import {ActualizarDeptoGQL, CrearDeptoGQL, DepartamentosGQL} from '#/libs/datos/src';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {Observable, tap} from 'rxjs';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {EntityDeptoStore} from '@s-admin/store/entity-depto.store';
import {SingleExecutionResult} from '@apollo/client';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';

@Injectable({providedIn: 'root'})
export class DeptoService
{
    constructor(private entityDepto: EntityDeptoStore, private departamentosGQL: DepartamentosGQL, private crearDeptoGQL: CrearDeptoGQL, private actualizarDeptoGQL: ActualizarDeptoGQL,
                private ngxToast: NgxToastService)
    {
    }

    departamentos(): Observable<SingleExecutionResult>
    {
        return this.departamentosGQL.watch({}).valueChanges.pipe(tap((res) =>
        {
            if (res.data)
            {
                const deptos = res.data.deptos as IDepto[];
                this.entityDepto.setAll(deptos);
            }
        }));
    }

    // Observable<SingleExecutionResult<CrearDeptoMutation>>
    crearDepto(input: IDepto): Observable<SingleExecutionResult>
    {
        return this.crearDeptoGQL.mutate({input}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const depto = $cast<IDepto>(res.data.crearDepto);
                this.entityDepto.addOne(depto);
                this.ngxToast.satisfactorioToast('El departamento ser registro con exito', 'Nuevo departamento');
            }
        }));
    }

    actualizarDepto(input: IDepto): Observable<SingleExecutionResult>
    {
        return this.actualizarDeptoGQL.mutate({input}).pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const changes = $cast<IDepto>(res.data.actualizarDepto);
                this.entityDepto.updateOne({id: changes._id, changes});
                this.ngxToast.satisfactorioToast('El Departamento se actualizo con exito', 'Actualizar departamento');
            }
        }));
    }
}
