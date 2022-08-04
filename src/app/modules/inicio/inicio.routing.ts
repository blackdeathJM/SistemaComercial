import {Route, RouterModule} from '@angular/router';
import {InicioComponent} from '@s-app/modules/inicio/inicio.component';
import {NgModule} from '@angular/core';

export const inicioRouting: Route[] =
    [
        {
            path: '',
            component: InicioComponent
        }
    ];

@NgModule(
    {
        imports: [RouterModule.forChild(inicioRouting)],
        exports: [RouterModule]
    }
)
export class InicioRouting
{
}
