import {Route, RouterModule} from '@angular/router';
import {ListaEmpleadosComponent} from '@s-app/empleado/lista/lista-empleados.component';
import {NgModule} from '@angular/core';

const empleadoRouting: Route[] =
    [
        {
            path: 'lista-empleados',
            component: ListaEmpleadosComponent
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(empleadoRouting)],
    exports: [RouterModule]
})
export class EmpleadoRouting
{
}
