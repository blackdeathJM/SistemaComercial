import {Route, RouterModule} from '@angular/router';
import {ListaEmpleadosComponent} from '@s-app/empleado/lista/lista-empleados.component';
import {NgModule} from '@angular/core';
import {DetalleEmpleadoComponent} from '@s-app/empleado/detalle/detalle-empleado.component';

const empleadoRouting: Route[] =
    [
        {
            path: 'lista-empleados',
            component: ListaEmpleadosComponent
        },
        {
            path: 'detalle-empleado',
            component: DetalleEmpleadoComponent
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(empleadoRouting)],
    exports: [RouterModule]
})
export class EmpleadoRouting
{
}
