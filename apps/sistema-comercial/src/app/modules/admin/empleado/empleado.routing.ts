import {Route, RouterModule} from '@angular/router';
import {ListaEmpleadosComponent} from '@s-app/empleado/lista-empleado/lista-empleados.component';
import {NgModule} from '@angular/core';
import {DetalleEmpleadoComponent} from '@s-app/empleado/detalle-empleado/detalle-empleado.component';

const empleadoRouting: Route[] =
    [
        {
            path: 'empleado',
            component: ListaEmpleadosComponent,
            children:
                [
                    {
                        path: ':_id',
                        component: DetalleEmpleadoComponent
                    }
                ]
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(empleadoRouting)],
    exports: [RouterModule]
})
export class EmpleadoRouting
{
}
