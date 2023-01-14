import {Injectable} from '@angular/core';
import {ActualizarDeptoGQL, CrearDeptoGQL, DepartamentosGQL, FiltrarDeptosGQL, FiltrarDeptosQuery} from '#/libs/datos/src';
import {NgxToastService} from '#/apps/sistema-comercial/src/app/services/ngx-toast.service';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IDepto} from '#/libs/models/src/lib/admin/deptos/depto.interface';
import {EntityDeptoStore} from '@s-admin/store/entity-depto.store';

@Injectable({providedIn: 'root'})
export class DeptoService
{
    constructor(private crearDeptoGQL: CrearDeptoGQL, private departamentosGQL: DepartamentosGQL, private actualizarDeptoGQL: ActualizarDeptoGQL, private ngxToast: NgxToastService,
                private entityDepto: EntityDeptoStore, private filtrarDeptosGQL: FiltrarDeptosGQL)
    {
    }

    departamentos(): Observable<SingleExecutionResult>
    {
        return this.departamentosGQL.watch({}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const deptos = $cast<IDepto[]>(res.data.deptos);
                this.entityDepto.setAll(deptos);
            }
        }));
    }

    filtarDeptos(nombre: string): Observable<SingleExecutionResult<FiltrarDeptosQuery>>
    {
        return this.filtrarDeptosGQL.watch({nombre}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const deptosFiltrados = $cast<IDepto[]>(res.data.filtrarDeptos);
                this.entityDepto.setAll(deptosFiltrados);
            }
        }));
    }

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
