import {Injectable} from '@angular/core';
import {ActualizarDeptoGQL, CrearDeptoGQL, DepartamentosGQL, FiltrarDeptosGQL, FiltrarDeptosQuery} from '#/libs/datos/src';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {finalize, Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {$cast, isNotNil} from '@angular-ru/cdk/utils';
import {IDepto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {EntityDeptoStore} from '@s-dirAdmonFinanzas/departamento/store/entity-depto.store';
import {NgxUiLoaderService} from 'ngx-ui-loader';

export const loaderDeptos = 'loaderDeptos';

@Injectable({providedIn: 'root'})
export class DeptoService
{
    constructor(private crearDeptoGQL: CrearDeptoGQL, private departamentosGQL: DepartamentosGQL, private actualizarDeptoGQL: ActualizarDeptoGQL, private ngxToast: NgxToastService,
                private entityDepto: EntityDeptoStore, private filtrarDeptosGQL: FiltrarDeptosGQL, private ngxLoader: NgxUiLoaderService)
    {
    }

    departamentos(): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderDeptos);
        return this.departamentosGQL.watch({}).valueChanges.pipe(tap((res) =>
        {
            if (isNotNil(res.data))
            {
                const deptos = $cast<IDepto[]>(res.data.deptos);
                this.entityDepto.setAll(deptos);
            }
            this.ngxLoader.stopLoader(loaderDeptos);
        }));
    }

    filtarDeptos(nombre: string): Observable<SingleExecutionResult<FiltrarDeptosQuery>>
    {
        this.ngxLoader.startLoader(loaderDeptos);
        return this.filtrarDeptosGQL.watch({nombre}).valueChanges.pipe(finalize(() => this.ngxLoader.stopLoader(loaderDeptos)), tap((res) =>
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
