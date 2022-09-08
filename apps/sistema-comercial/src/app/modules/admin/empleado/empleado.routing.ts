import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const empleadoRouting: Route[] =
    [];

@NgModule({
    imports: [RouterModule.forChild(empleadoRouting)],
    exports: [RouterModule]
})
export class EmpleadoRouting
{
}
