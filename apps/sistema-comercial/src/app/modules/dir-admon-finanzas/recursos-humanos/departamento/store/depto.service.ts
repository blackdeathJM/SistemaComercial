import {Injectable} from '@angular/core';
import {ActualizarDeptoGQL, AgregarPuestoGQL, AgregarPuestoMutation, CrearDeptoGQL, DepartamentosGQL, FiltrarDeptosGQL, FiltrarDeptosQuery} from '#/libs/datos/src';
import {NgxToastService} from '@s-services/ngx-toast.service';
import {Observable, tap} from 'rxjs';
import {SingleExecutionResult} from '@apollo/client';
import {IDepto, IRegPuesto} from '#/libs/models/src/lib/dir-admon-finanzas/recursos-humanos/deptos/depto.interface';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DeptoStore} from '@s-dirAdmonFinanzas/departamento/store/depto.store';

export const loaderDeptos = 'loaderDeptos';

@Injectable({providedIn: 'root'})
export class DeptoService
{
    constructor(private crearDeptoGQL: CrearDeptoGQL, private departamentosGQL: DepartamentosGQL, private actualizarDeptoGQL: ActualizarDeptoGQL, private ngxToast: NgxToastService,
                private filtrarDeptosGQL: FiltrarDeptosGQL, private ngxLoader: NgxUiLoaderService, private agregarPuestoGQL: AgregarPuestoGQL, private deptoStore: DeptoStore)
    {
    }

    departamentos(): Observable<SingleExecutionResult>
    {
        this.ngxLoader.startLoader(loaderDeptos);
        return this.departamentosGQL.fetch({}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const deptos = res.data.deptos as IDepto[];
                // this.entityDepto.setAll(deptos);
                this.deptoStore.set(deptos);
            }
            this.ngxLoader.stopLoader(loaderDeptos);
        }));
    }

    filtarDeptos(nombre: string): Observable<SingleExecutionResult<FiltrarDeptosQuery>>
    {
        this.ngxLoader.startLoader(loaderDeptos);
        return this.filtrarDeptosGQL.fetch({nombre}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const deptosFiltrados = res.data.filtrarDeptos as IDepto[];
                // this.entityDepto.setAll(deptosFiltrados);
                this.deptoStore.set(deptosFiltrados);
            }
            this.ngxLoader.stopLoader(loaderDeptos);
        }));
    }

    crearDepto(input: IDepto): Observable<SingleExecutionResult>
    {
        return this.crearDeptoGQL.mutate({input}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const depto = res.data.crearDepto as IDepto;
                // this.entityDepto.setOne(depto);
                this.deptoStore.add(depto);
                this.ngxToast.satisfactorioToast('El departamento ser registro con exito', 'Nuevo departamento');
            }
        }));
    }

    actualizarDepto(input: IDepto): Observable<SingleExecutionResult>
    {
        return this.actualizarDeptoGQL.mutate({input}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.actualizarDepto as IDepto;
                // this.entityDepto.updateOne({id: _id, changes});
                this.deptoStore.update(_id, changes);
                this.ngxToast.satisfactorioToast('El Departamento se actualizo con exito', 'Actualizar departamento');
            }
        }));
    }

    agregarPuesto(puesto: IRegPuesto): Observable<SingleExecutionResult<AgregarPuestoMutation>>
    {
        return this.agregarPuestoGQL.mutate({puesto}).pipe(tap((res) =>
        {
            if (res.data)
            {
                const {_id, ...changes} = res.data.agregarPuesto as IDepto;
                // this.entityDepto.updateOne({id: _id, changes});
                this.deptoStore.update(_id, changes);
                this.ngxToast.satisfactorioToast('El puesto se a agregado correctamente', 'Agregar nuevo puesto');
            }
        }));
    }
}
